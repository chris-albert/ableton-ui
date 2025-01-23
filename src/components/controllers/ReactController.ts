import { Color } from './Color'
import { Midi } from '../../midi/GlobalMidi'
import { TX_MESSAGE } from '../../model/AbletonUIMessage'
import { useBarBeats, useIsPlaying } from '../../hooks/RealTimeHooks'

// Custom renderer stuff https://github.com/chentsulin/awesome-react-renderer
type ControllerElement = {
  color: Color
  onClick?: () => void
}

type ControllerComponent = () => Array<ControllerElement>

const PlayComponent: ControllerComponent = () => {
  const onClick = () => {
    Midi.emitters.daw.send(TX_MESSAGE.play())
  }
  return [{ color: Color.GREEN, onClick }]
}

const StopComponent: ControllerComponent = () => {
  const onClick = () => {
    Midi.emitters.daw.send(TX_MESSAGE.stop())
  }
  return [{ color: Color.RED, onClick }]
}

const PlayStopComponent: ControllerComponent = () => {
  const isPlaying = useIsPlaying()

  const onClick = () => {
    Midi.emitters.daw.send(isPlaying ? TX_MESSAGE.stop() : TX_MESSAGE.play())
  }

  return [{ color: isPlaying ? Color.RED : Color.GREEN, onClick }]
}

const MetronomeComponent: ControllerComponent = () => {
  const barBeats = useBarBeats()

  return [{ color: barBeats === 1 ? Color.GREEN : Color.RED }]
}

const run = () => {}

export default { run }
