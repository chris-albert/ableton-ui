import { WidgetBinding, WidgetBindings } from './WidgetBinding'
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
import { MidiTarget } from '../../midi/MidiTarget'
import { Controller } from './Controller'

export const MyCustomBindings = (controller: Controller) =>
  new WidgetBindings({
    controller: controller,
    bindings: [
      new WidgetBinding({
        targets: [MidiTarget.note(89)],
        widget: PlayStopWidget,
      }),
      new WidgetBinding({
        targets: [MidiTarget.note(19)],
        widget: StopWidget,
      }),
      new WidgetBinding({
        targets: [MidiTarget.note(29)],
        widget: PlayWidget,
      }),
      new WidgetBinding({
        targets: [MidiTarget.note(99)],
        widget: MetronomeFlashWidget,
      }),
      new WidgetBinding({
        targets: [
          MidiTarget.note(81),
          MidiTarget.note(82),
          MidiTarget.note(83),
          MidiTarget.note(84),
          MidiTarget.note(85),
          MidiTarget.note(86),
          MidiTarget.note(87),
          MidiTarget.note(88),
        ],
        widget: BeatsWidget,
      }),

      new WidgetBinding({
        targets: [
          MidiTarget.note(61),
          MidiTarget.note(62),
          MidiTarget.note(63),
          MidiTarget.note(64),
          MidiTarget.note(65),
          MidiTarget.note(66),
          MidiTarget.note(67),
          MidiTarget.note(68),
        ],
        widget: TimeSignatureNoteCountWidget,
      }),

      new WidgetBinding({
        targets: [
          MidiTarget.note(51),
          MidiTarget.note(52),
          MidiTarget.note(53),
          MidiTarget.note(54),
          MidiTarget.note(55),
          MidiTarget.note(56),
          MidiTarget.note(57),
          MidiTarget.note(58),
        ],
        widget: TimeSignatureNoteLengthWidget,
      }),

      new WidgetBinding({
        targets: [
          MidiTarget.note(11),
          MidiTarget.note(12),
          MidiTarget.note(13),
          MidiTarget.note(14),
          MidiTarget.note(15),
          MidiTarget.note(16),
          MidiTarget.note(17),
          MidiTarget.note(18),
        ],
        widget: SongsWidget(0, 8, 'Songs'),
      }),

      new WidgetBinding({
        targets: [
          MidiTarget.note(41),
          MidiTarget.note(42),
          MidiTarget.note(43),
          MidiTarget.note(44),
          MidiTarget.note(45),
          MidiTarget.note(46),
          MidiTarget.note(47),
          MidiTarget.note(48),
        ],
        widget: TrackSectionsWidget('Parts', 'Songs'),
      }),

      new WidgetBinding({
        targets: [
          MidiTarget.note(71),
          MidiTarget.note(72),
          MidiTarget.note(73),
          MidiTarget.note(74),
          MidiTarget.note(75),
          MidiTarget.note(76),
          MidiTarget.note(77),
          MidiTarget.note(78),
        ],
        widget: BarTrackerWidget('Bars'),
      }),
    ],
  })
