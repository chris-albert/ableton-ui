import { Data } from 'effect'
import { Controller, ControllerPadTarget, targetToKey, targetToMessage } from './Controller'
import { MidiInput, MidiMessage, MidiOutput } from '../../midi/WindowMidi'
import _ from 'lodash'

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

  private initWidgetBindings(midiOutput: MidiOutput): void {
    this.widgetBindings = _.fromPairs(
      _.map(this.bindings, (binding) => {
        return [
          targetToKey(binding.target),
          binding.widget((value) => midiOutput.send(targetToMessage(binding.target, value))),
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

  bind(midiInput: MidiInput, midiOutput: MidiOutput) {
    this.initWidgetBindings(midiOutput)
    midiInput.on('*', (m) => this.onMessage(m))
  }
}
