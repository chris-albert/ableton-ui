import { Data } from 'effect'
import { Controller, ControllerPadTarget, messageToKey, targetToKey, targetToMessage } from './Controller'
import { MidiMessage } from '../../midi/WindowMidi'
import _ from 'lodash'
import { Midi } from '../../midi/GlobalMidi'
import { Color } from '../../components/controllers/Color'

export type WidgetAction = (index: number) => void
export type WidgetRender = (values: Array<Color | undefined>) => void
export type WidgetOpts = {
  render: WidgetRender
  targets: Array<ControllerPadTarget>
}
export type ControllerWidget = (opts: WidgetOpts) => WidgetAction

const empty: ControllerWidget = () => () => {}
const guard =
  <A>(f: () => A | undefined) =>
  (w: (a: A) => ControllerWidget): ControllerWidget => {
    const fa = f()
    if (fa === undefined) return empty
    else return w(fa)
  }

export const ControllerWidget = {
  empty,
  guard,
}

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
            this.controller.render(_.map(binding.targets, (target, i) => ({ target, color: values[i] }))),
        })

        return _.map(binding.targets, (target, i) => [targetToKey(target), () => widget(i)])
      }),
    )
  }

  onMessage(message: MidiMessage) {
    const action = _.get(this.widgetBindings, messageToKey(message), undefined)
    if (action !== undefined) {
      action()
    }
  }

  bind() {
    this.controller.clear()
    this.controller.init()
    this.initWidgetBindings()
    Midi.listeners.controller.on('*', (m) => this.onMessage(m))
  }
}
