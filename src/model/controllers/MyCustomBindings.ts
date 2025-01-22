import { WidgetBinding, WidgetBindings } from './WidgetBinding'
import { ControllerPadNote } from './Controller'
import { LaunchPadMiniMk3 } from './LaunchPadMiniMk3'
import {
  BarTrackerWidget,
  BeatsWidget,
  MetronomeFlashWidget,
  PlayStopWidget,
  PlayWidget,
  SongsWidget,
  StopWidget,
  TimeSignatureNoteCountWidget,
  TimeSignatureNoteLengthWidget,
  TrackSectionsWidget,
} from './Widgets'

export const MyCustomBindings: WidgetBindings = new WidgetBindings({
  controller: LaunchPadMiniMk3,
  bindings: [
    new WidgetBinding({
      targets: [ControllerPadNote(89)],
      widget: PlayStopWidget,
    }),
    new WidgetBinding({
      targets: [ControllerPadNote(19)],
      widget: StopWidget,
    }),
    new WidgetBinding({
      targets: [ControllerPadNote(29)],
      widget: PlayWidget,
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

    new WidgetBinding({
      targets: [
        ControllerPadNote(61),
        ControllerPadNote(62),
        ControllerPadNote(63),
        ControllerPadNote(64),
        ControllerPadNote(65),
        ControllerPadNote(66),
        ControllerPadNote(67),
        ControllerPadNote(68),
      ],
      widget: TimeSignatureNoteCountWidget,
    }),

    new WidgetBinding({
      targets: [
        ControllerPadNote(51),
        ControllerPadNote(52),
        ControllerPadNote(53),
        ControllerPadNote(54),
        ControllerPadNote(55),
        ControllerPadNote(56),
        ControllerPadNote(57),
        ControllerPadNote(58),
      ],
      widget: TimeSignatureNoteLengthWidget,
    }),

    new WidgetBinding({
      targets: [
        ControllerPadNote(11),
        ControllerPadNote(12),
        ControllerPadNote(13),
        ControllerPadNote(14),
        ControllerPadNote(15),
        ControllerPadNote(16),
        ControllerPadNote(17),
        ControllerPadNote(18),
      ],
      widget: SongsWidget(0, 8, 'Songs'),
    }),

    new WidgetBinding({
      targets: [
        ControllerPadNote(41),
        ControllerPadNote(42),
        ControllerPadNote(43),
        ControllerPadNote(44),
        ControllerPadNote(45),
        ControllerPadNote(46),
        ControllerPadNote(47),
        ControllerPadNote(48),
      ],
      widget: TrackSectionsWidget('Parts', 'Songs'),
    }),

    new WidgetBinding({
      targets: [
        ControllerPadNote(71),
        ControllerPadNote(72),
        ControllerPadNote(73),
        ControllerPadNote(74),
        ControllerPadNote(75),
        ControllerPadNote(76),
        ControllerPadNote(77),
        ControllerPadNote(78),
      ],
      widget: BarTrackerWidget('Bars'),
    }),
  ],
})
