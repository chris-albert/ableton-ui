import { WidgetBinding, WidgetBindings } from './WidgetBinding'
import { ControllerPadNote } from './Controller'
import { LaunchPadMiniMk3 } from './LaunchPadMiniMk3'
import { BeatsWidget, MetronomeFlashWidget, PlayStopWidget } from './Widgets'

export const MyCustomBindings: WidgetBindings = new WidgetBindings({
  controller: LaunchPadMiniMk3,
  bindings: [
    new WidgetBinding({
      targets: [ControllerPadNote(19)],
      widget: PlayStopWidget,
    }),
    new WidgetBinding({
      targets: [ControllerPadNote(99)],
      widget: MetronomeFlashWidget,
    }),
    new WidgetBinding({
      targets: [
        ControllerPadNote(81),
        ControllerPadNote(82),
        ControllerPadNote(83),
        ControllerPadNote(84),
        ControllerPadNote(85),
        ControllerPadNote(86),
        ControllerPadNote(87),
        ControllerPadNote(88),
      ],
      widget: BeatsWidget,
    }),
  ],
})
