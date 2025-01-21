import { Data } from 'effect'
import { Controller, ControllerPadTarget, targetToKey, targetToMessage } from './Controller'
import { MidiMessage } from '../../midi/WindowMidi'
import _ from 'lodash'
import { Midi } from '../../midi/GlobalMidi'

export type WidgetAction = () => void
export type ControllerWidget = (f: (value: number) => void) => () => void

export class WidgetBinding extends Data.Class<{
  target: ControllerPadTarget
  widget: ControllerWidget
}> {}

export class WidgetBindings extends Data.Class<{
  controller: Controller
  bindings: Array<WidgetBinding>
}> {
  private widgetBindings: Record<string, WidgetAction> = {}

  private initWidgetBindings(): void {
    this.widgetBindings = _.fromPairs(
      _.map(this.bindings, (binding) => {
        return [
          targetToKey(binding.target),
          binding.widget((value) => Midi.emitters.controller.send(targetToMessage(binding.target, value))),
        ]
      }),
    )
  }

  private messageToKey(message: MidiMessage): string {
    if (message.type === 'noteon' && message.velocity > 0) {
      return `noteon-${message.note}`
    } else if (message.type === 'cc') {
      return `cc-${message.controllerNumber}`
    } else {
      return ''
    }
  }

  onMessage(message: MidiMessage) {
    const action = _.get(this.widgetBindings, this.messageToKey(message), undefined)
    if (action !== undefined) {
      action()
    }
  }

  bind() {
    this.controller.init()
    this.initWidgetBindings()
    Midi.listeners.controller.on('*', (m) => this.onMessage(m))
  }
}
