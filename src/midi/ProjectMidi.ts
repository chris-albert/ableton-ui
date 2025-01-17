import { Midi } from './GlobalMidi'

let isInit = false
const init = () => {
  if (!isInit) {
    isInit = true
    ProjectListener()
  }
}

const ProjectListener = () => {
  console.debug('Listening for DAW events ...')

  Midi.listeners.daw.on('sysex', (message) => {
    console.debug('daw message', message)
  })
}

export const ProjectMidi = {
  init,
}
