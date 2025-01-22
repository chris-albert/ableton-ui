import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { ControllerWidget } from './WidgetBinding'
import { Midi } from '../../midi/GlobalMidi'
import { ProjectMidi } from '../../midi/ProjectMidi'
import _ from 'lodash'
import { NavigateableClip } from '../UIStateDisplay'
import { getNovationColor } from '../../components/controllers/NovationColors'

export const PlayStopWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const color = (playing: boolean): number => (playing ? 5 : 87)

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

export const MetronomeFlashWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const color = (barBeat: number): number => (barBeat === 1 ? 5 : 87)

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

  const color = (barBeat: number): number => (barBeat === 1 ? 5 : 87)

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
    opts.render(_.map(Array(opts.targets.length), (_, i) => (i + 1 <= sig.noteCount ? 87 : 0)))
  }

  render()

  store.sub(ProjectMidi.atoms.realTime.timeSignature, render)
  return () => {}
}

export const TimeSignatureNoteLengthWidget: ControllerWidget = (opts) => {
  const store = getDefaultStore()

  const render = () => {
    const sig = store.get(ProjectMidi.atoms.realTime.timeSignature)
    opts.render(_.map(Array(opts.targets.length), (_, i) => (i + 1 <= sig.noteLength ? 87 : 0)))
  }

  render()

  store.sub(ProjectMidi.atoms.realTime.timeSignature, render)
  return () => {}
}

export const SongsWidget =
  (fromIndex: number, toIndex: number, trackName: string): ControllerWidget =>
  (opts) => {
    const store = getDefaultStore()

    const arrangement = ProjectMidi.arrangement()
    const cueHash = _.fromPairs(_.map(arrangement.cues, (cue) => [cue.time, cue]))
    const clips: Array<NavigateableClip> = []

    const track = _.find(arrangement.tracks, (t) => t.name === trackName)
    if (track !== undefined) {
      track.clips.forEach((clip) => {
        if (clip.type === 'real') {
          const cue = _.get(cueHash, clip.startTime, undefined)
          if (cue !== undefined) {
            clips.push({ clip, cue })
          }
        }
      })
    }

    const render = () => {
      const beat = store.get(ProjectMidi.atoms.realTime.beats)
      opts.render(
        _.map(Array(toIndex - fromIndex), (c, i) => {
          const clip = _.get(clips, i, undefined)
          if (clip !== undefined) {
            return getNovationColor(clip.clip.color)
          } else {
            return 0
          }
        }),
      )
    }

    render()

    return (i) => {
      const clip = _.get(clips, i, undefined)
      if (clip !== undefined) {
        Midi.emitters.daw.send(TX_MESSAGE.jumpToCue(clip.cue.index))
      }
    }
  }
