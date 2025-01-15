import { midiOutputAtom } from '../../hooks/Midi'
import { TX_MESSAGE } from '../AbletonUIMessage'
import { getDefaultStore } from 'jotai'
import { isPlayingAtom } from '../RealTime'
import { ControllerWidget } from './WidgetBinding'

export const PlayStopWidget: ControllerWidget = (sub) => {
  const store = getDefaultStore()

  const isPlaying = store.get(isPlayingAtom)
  const midiOutput = store.get(midiOutputAtom)

  const color = (playing: boolean): number => (playing ? 5 : 10)

  sub(color(isPlaying))

  store.sub(isPlayingAtom, () => {
    sub(color(store.get(isPlayingAtom)))
  })

  return () => {
    if (midiOutput !== undefined) {
      if (isPlaying) {
        midiOutput.send(TX_MESSAGE.stop())
      } else {
        midiOutput.send(TX_MESSAGE.play())
      }
    }
  }
}
