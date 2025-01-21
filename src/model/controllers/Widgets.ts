import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { ControllerWidget } from './WidgetBinding'
import { Midi } from '../../midi/GlobalMidi'
import { ProjectMidi } from '../../midi/ProjectMidi'
import _ from 'lodash'

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
