import { Midi } from './GlobalMidi'
import { Controller } from '../model/controllers/Controller'
import { atom, getDefaultStore } from 'jotai'
import { LaunchPadMiniMk3 } from '../model/controllers/LaunchPadMiniMk3'
import { WidgetBindings } from '../model/controllers/WidgetBinding'
import { MyCustomBindings } from '../model/controllers/MyCustomBindings'

const store = getDefaultStore()

const atoms = {
  controller: atom<Controller>(LaunchPadMiniMk3),
  bindings: atom<WidgetBindings>(MyCustomBindings),
}

const ControllerListener = () => {
  // Midi.listeners.controller.on('*', (message) => {
  //   console.debug('controller message', message)
  // })
  store.get(atoms.bindings).bind()
}

const getController = () => store.get(atoms.bindings).controller
const getBindings = () => store.get(atoms.bindings)

let isInit = false
const init = () => {
  if (!isInit) {
    isInit = true
    ControllerListener()
  }
}

export const ControllerMidi = {
  init,
  getController,
  getBindings,
}
