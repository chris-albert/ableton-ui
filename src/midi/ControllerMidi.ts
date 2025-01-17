import { Midi } from './GlobalMidi'

const ControllerListener = () => {
  Midi.listeners.controller.on('*', (message) => {
    console.debug('controller message', message)
  })
}

let isInit = false
const init = () => {
  if (!isInit) {
    isInit = true
    ControllerListener()
  }
}

export const ControllerMidi = {
  init,
}
