import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { isPlayingAtom } from '../RealTime'
import { ControllerWidget } from './WidgetBinding'
import { Midi } from '../../midi/GlobalMidi'

export const PlayStopWidget: ControllerWidget = (sub) => {
  const store = getDefaultStore()

  const isPlaying = store.get(isPlayingAtom)

  const color = (playing: boolean): number => (playing ? 5 : 10)

  sub(color(isPlaying))

  store.sub(isPlayingAtom, () => {
    sub(color(store.get(isPlayingAtom)))
  })

  return () => {
    Midi.emitters.controller.send(isPlaying ? TX_MESSAGE.stop() : TX_MESSAGE.play())
  }
}
