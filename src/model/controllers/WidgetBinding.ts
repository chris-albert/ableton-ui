import { Data } from 'effect'
import { Controller, ControllerPadTarget, targetToKey, targetToMessage } from './Controller'
import { MidiMessage } from '../../midi/WindowMidi'
import _ from 'lodash'
import { Midi } from '../../midi/GlobalMidi'

export type WidgetAction = (index: number) => void
export type WidgetRender = (values: Array<number>) => void
export type WidgetOpts = {
  render: WidgetRender
  targets: Array<ControllerPadTarget>
}
export type ControllerWidget = (opts: WidgetOpts) => WidgetAction

export class WidgetBinding extends Data.Class<{
  targets: Array<ControllerPadTarget>
  widget: ControllerWidget
}> {}

export class WidgetBindings extends Data.Class<{
  controller: Controller
  bindings: Array<WidgetBinding>
}> {
  private widgetBindings: Record<string, () => WidgetAction> = {}

  private initWidgetBindings(): void {
    this.widgetBindings = _.fromPairs(
      _.flatMap(this.bindings, (binding) => {
        const widget = binding.widget({
          targets: binding.targets,
          render: (values) =>
            _.forEach(binding.targets, (target, i) =>
              Midi.emitters.controller.send(targetToMessage(target, values[i])),
            ),
        })

        return _.map(binding.targets, (target, i) => [targetToKey(target), () => widget(i)])
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
