import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { ControllerWidget } from './WidgetBinding'
import { Midi } from '../../midi/GlobalMidi'
import { ProjectMidi } from '../../midi/ProjectMidi'

export const PlayStopWidget: ControllerWidget = (sub) => {
  const store = getDefaultStore()

  const isPlaying = store.get(ProjectMidi.atoms.realTime.isPlaying)

  const color = (playing: boolean): number => (playing ? 5 : 10)

  sub(color(isPlaying))

  store.sub(ProjectMidi.atoms.realTime.isPlaying, () => {
    sub(color(store.get(ProjectMidi.atoms.realTime.isPlaying)))
  })

  return () => {
    Midi.emitters.daw.send(isPlaying ? TX_MESSAGE.stop() : TX_MESSAGE.play())
  }
}
