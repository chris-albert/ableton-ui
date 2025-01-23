import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { ControllerWidget } from './WidgetBinding'
import { Midi } from '../../midi/GlobalMidi'
import { ProjectMidi } from '../../midi/ProjectMidi'
import _ from 'lodash'
import { NavigateableClip, UIClip, UIRealClip } from '../UIStateDisplay'
import { Color } from '../../components/controllers/Color'
import { searchActiveClip } from '../../hooks/ActiveClipHook'

export const PlayStopWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const color = (playing: boolean): number => (playing ? Color.RED : Color.GREEN)

  opts.render([color(store.get(ProjectMidi.atoms.realTime.isPlaying))])

  store.sub(ProjectMidi.atoms.realTime.isPlaying, () => {
    opts.render([color(store.get(ProjectMidi.atoms.realTime.isPlaying))])
  })

  return () => {
    Midi.emitters.daw.send(
      store.get(ProjectMidi.atoms.realTime.isPlaying) ? TX_MESSAGE.stop() : TX_MESSAGE.play(),
    )
  }
}

export const PlayWidget: ControllerWidget = (opts) => {
  opts.render([Color.GREEN])

  return () => {
    Midi.emitters.daw.send(TX_MESSAGE.play())
  }
}

export const StopWidget: ControllerWidget = (opts) => {
  opts.render([Color.RED])

  return () => {
    Midi.emitters.daw.send(TX_MESSAGE.stop())
  }
}

export const MetronomeFlashWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const color = (barBeat: number): number => (barBeat === 1 ? Color.GREEN : Color.RED)

  store.sub(ProjectMidi.atoms.realTime.barBeats, () => {
    opts.render([color(store.get(ProjectMidi.atoms.realTime.barBeats))])
    setTimeout(() => {
      opts.render([0])
    }, 100)
  })

  return () => {}
}

export const BeatsWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const color = (barBeat: number): number => (barBeat === 1 ? Color.GREEN : Color.RED)

  store.sub(ProjectMidi.atoms.realTime.barBeats, () => {
    const beat = store.get(ProjectMidi.atoms.realTime.barBeats)
    opts.render(_.map(Array(opts.targets.length), (_, i) => (i + 1 <= beat ? color(i + 1) : 0)))
  })

  return () => {}
}

export const TimeSignatureNoteCountWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const render = () => {
    const sig = store.get(ProjectMidi.atoms.realTime.timeSignature)
    opts.render(_.map(Array(opts.targets.length), (_, i) => (i + 1 <= sig.noteCount ? Color.BLUE : 0)))
  }

  render()

  store.sub(ProjectMidi.atoms.realTime.timeSignature, render)
  return () => {}
}

export const TimeSignatureNoteLengthWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const render = () => {
    const sig = store.get(ProjectMidi.atoms.realTime.timeSignature)
    opts.render(_.map(Array(opts.targets.length), (_, i) => (i + 1 <= sig.noteLength ? Color.PURPLE : 0)))
  }

  render()

  store.sub(ProjectMidi.atoms.realTime.timeSignature, render)
  return () => {}
}

export const SongsWidget = (fromIndex: number, toIndex: number, trackName: string): ControllerWidget =>
  ControllerWidget.guard(() => _.find(ProjectMidi.arrangement().tracks, (t) => t.name === trackName))(
    (track) => (opts) => {
      const store = getDefaultStore()

      const arrangement = ProjectMidi.arrangement()
      const cueHash = _.fromPairs(_.map(arrangement.cues, (cue) => [cue.time, cue]))
      const clips: Array<NavigateableClip> = []

      track.clips.forEach((clip) => {
        if (clip.type === 'real') {
          const cue = _.get(cueHash, clip.startTime, undefined)
          if (cue !== undefined) {
            clips.push({ clip, cue })
          }
        }
      })

      let storedActiveClip: UIRealClip | undefined = undefined
      let interval: NodeJS.Timer | number | undefined = undefined
      let intervalCount = 0
      const setActiveClip = (activeClip: UIRealClip, index: number) => {
        if (activeClip !== storedActiveClip) {
          storedActiveClip = activeClip
          intervalCount = 0
          clearInterval(interval)
          const onArr = Array(index + 1).fill(undefined)
          onArr[index] = activeClip.color
          const offArr = Array(index + 1).fill(undefined)
          offArr[index] = Color.BLACK
          interval = setInterval(() => {
            if (intervalCount % 2 === 0) {
              opts.render(onArr)
            } else {
              opts.render(offArr)
            }
            intervalCount++
          }, 250)
        }
      }

      const setBlankClip = () => {
        storedActiveClip = undefined
        clearInterval(interval)
        interval = undefined
      }

      const render = () => {
        const beat = store.get(ProjectMidi.atoms.realTime.beats)
        const activeClip = searchActiveClip(track.clips, beat)
        if (activeClip.type === 'blank') {
          setBlankClip()
        }
        opts.render(
          _.map(Array(toIndex - fromIndex), (c, i) => {
            const clip = _.get(clips, i, undefined)
            if (clip !== undefined) {
              if (activeClip === clip.clip) {
                setActiveClip(activeClip, i)
                // If we are the active clip, let the active clip interval to the rendering
                return undefined
              } else {
                return clip.clip.color
              }
            } else {
              return 0
            }
          }),
        )
      }

      render()
      store.sub(ProjectMidi.atoms.realTime.beats, render)

      return (i) => {
        const clip = _.get(clips, i, undefined)
        if (clip !== undefined) {
          Midi.emitters.daw.send(TX_MESSAGE.jumpToCue(clip.cue.index))
        }
      }
    },
  )

export const TrackSectionsWidget = (
  trackName: string,
  parentTrackName: string | undefined,
): ControllerWidget =>
  ControllerWidget.guard(() => _.find(ProjectMidi.arrangement().tracks, (t) => t.name === trackName))(
    (track) => (opts) => {
      const size = opts.targets.length
      const store = getDefaultStore()

      const parentTrack = _.find(ProjectMidi.arrangement().tracks, (t) => t.name === parentTrackName)

      const validInParent =
        (beat: number) =>
        (clip: UIClip): boolean => {
          if (parentTrack === undefined) {
            return true
          } else {
            const parentActive = searchActiveClip(parentTrack.clips, beat)
            return parentActive.endTime === undefined ? false : clip.startTime < parentActive.endTime
          }
        }

      const render = () => {
        const beat = store.get(ProjectMidi.atoms.realTime.beats)
        const activeClip = searchActiveClip(track.clips, beat)

        const tmpClips: Array<UIClip> = []
        track.clips.forEach((clip) => {
          if (clip.startTime >= activeClip.startTime) {
            tmpClips.push(clip)
          }
        })
        const visibleClips = _.filter(_.take(tmpClips, size), validInParent(beat))
        opts.render(
          _.map(Array(size), (c, i) => {
            const clip = _.get(visibleClips, i, undefined)
            if (clip !== undefined && clip.type === 'real') {
              return clip.color
            } else {
              return Color.BLACK
            }
          }),
        )
      }

      render()
      store.sub(ProjectMidi.atoms.realTime.beats, render)

      return () => {}
    },
  )

export const BarTrackerWidget = (trackName: string): ControllerWidget =>
  ControllerWidget.guard(() => _.find(ProjectMidi.arrangement().tracks, (t) => t.name === trackName))(
    (track) => (opts) => {
      const size = opts.targets.length
      const store = getDefaultStore()

      let barCount = 0
      const render = () => {
        const beat = store.get(ProjectMidi.atoms.realTime.beats)
        const barBeat = store.get(ProjectMidi.atoms.realTime.barBeats)
        const activeClip = searchActiveClip(track.clips, beat)
        if (activeClip.type === 'real') {
          const count = Number(activeClip.name)
          if (!isNaN(count)) {
            if (activeClip.startTime === beat) {
              barCount = 0
            } else if (barBeat === 1) {
              barCount++
              if (barCount >= count) {
                barCount = 0
              }
            }
            opts.render(_.map(Array(size), (a, i) => (i <= barCount ? Color.GREEN : Color.BLACK)))
          }
        }
      }

      render()
      store.sub(ProjectMidi.atoms.realTime.barBeats, render)

      return () => {}
    },
  )
