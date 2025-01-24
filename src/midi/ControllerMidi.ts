import { Controller } from '../model/controllers/Controller'
import { atom, getDefaultStore } from 'jotai'
import { LaunchPadMiniMk3 } from '../model/controllers/LaunchPadMiniMk3'
import { WidgetBindings } from '../model/controllers/WidgetBinding'
import { MyCustomBindings } from '../model/controllers/MyCustomBindings'
import { ReactReconcilerController } from '../components/controllers/ReactReconcilerController'

const store = getDefaultStore()

const atoms = {
  controller: atom<Controller>(LaunchPadMiniMk3),
  bindings: atom<WidgetBindings>(MyCustomBindings),
}

const ControllerListener = () => {
  console.log('Controller Init')
  store.get(atoms.bindings).bind()
  ReactReconcilerController()
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
