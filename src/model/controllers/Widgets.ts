import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { ControllerWidget } from './WidgetBinding'
import { Midi } from '../../midi/GlobalMidi'
import { ProjectMidi } from '../../midi/ProjectMidi'

export const PlayStopWidget: ControllerWidget = (sub) => {
  const store = getDefaultStore()

  const color = (playing: boolean): number => (playing ? 5 : 87)

  sub(color(store.get(ProjectMidi.atoms.realTime.isPlaying)))

  store.sub(ProjectMidi.atoms.realTime.isPlaying, () => {
    sub(color(store.get(ProjectMidi.atoms.realTime.isPlaying)))
  })

  return () => {
    Midi.emitters.daw.send(
      store.get(ProjectMidi.atoms.realTime.isPlaying) ? TX_MESSAGE.stop() : TX_MESSAGE.play(),
    )
  }
}

export const MetronomeFlashWidget: ControllerWidget = (sub) => {
  const store = getDefaultStore()

  const color = (barBeat: number): number => (barBeat === 1 ? 5 : 87)

  store.sub(ProjectMidi.atoms.realTime.barBeats, () => {
    sub(color(store.get(ProjectMidi.atoms.realTime.barBeats)))
    setTimeout(() => {
      sub(0)
    }, 100)
  })

  return () => {}
}
