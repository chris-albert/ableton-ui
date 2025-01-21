import { WidgetBinding, WidgetBindings } from './WidgetBinding'
import { ControllerPadNote } from './Controller'
import { LaunchPadMiniMk3 } from './LaunchPadMiniMk3'
import { MetronomeFlashWidget, PlayStopWidget } from './Widgets'

export const MyCustomBindings: WidgetBindings = new WidgetBindings({
  controller: LaunchPadMiniMk3,
  bindings: [
    new WidgetBinding({
      target: ControllerPadNote(19),
      widget: PlayStopWidget,
    }),
    new WidgetBinding({
      target: ControllerPadNote(99),
      widget: MetronomeFlashWidget,
    }),
  ],
})
