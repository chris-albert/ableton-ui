import * as t from 'io-ts'
import {atomWithStorage} from "jotai/utils";
import {produce, current} from "immer"
import {atom} from "jotai";

/**
 * Common widget settings
 */
export const WidgetSettings = t.type({
  borderSizePx: t.number,
  borderColor: t.string,
  label: t.union([t.undefined, t.string])
})

export type WidgetSettings = t.TypeOf<typeof WidgetSettings>

export const defaultWidgetSettings = (): WidgetSettings => ({
  borderSizePx: 1,
  borderColor: 'white',
  label: undefined
})

/**
 * Time Signature
 */
export const TimeSignatureWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('time-signature')
})])

export type TimeSignatureWidget = t.TypeOf<typeof TimeSignatureWidget>

export const timeSignature = (): TimeSignatureWidget => ({
  type: 'time-signature',
  ...defaultWidgetSettings()
})

/**
 * Tempo
 */
export const TempoWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('tempo')
})])

export type TempoWidget = t.TypeOf<typeof TempoWidget>

export const tempo = (): TempoWidget => ({
  type: 'tempo',
  ...defaultWidgetSettings()
})

/**
 * Beat Counter
 */
export const BeatCounterWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('beat-counter')
})])

export type BeatCounterWidget = t.TypeOf<typeof BeatCounterWidget>

export const beatCounter = (): BeatCounterWidget => ({
  type: 'beat-counter',
  ...defaultWidgetSettings()
})

/**
 * Bar Beat
 */
export const BarBeatWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('bar-beat')
})])

export type BarBeatWidget = t.TypeOf<typeof BarBeatWidget>

export const barBeat = (): BarBeatWidget => ({
  type: 'bar-beat',
  ...defaultWidgetSettings()
})

/**
 * Beat Count
 */
export const BeatCountWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('beat-count')
})])

export type BeatCountWidget = t.TypeOf<typeof BeatCountWidget>

export const beatCount = (): BeatCountWidget => ({
  type: 'beat-count',
  ...defaultWidgetSettings()
})

/**
 * Active Track Clip
 */
export const ActiveTrackClipWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('active-track-clip'),
  track: t.string
})])

export type ActiveTrackClipWidget = t.TypeOf<typeof ActiveTrackClipWidget>

export const activeTrackClip = (track: string): ActiveTrackClipWidget => ({
  type: 'active-track-clip',
  track,
  ...defaultWidgetSettings()
})

/**
 * Track Sections
 */
export const TrackSectionsWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('track-sections'),
  track: t.string,
  size: t.number
})])

export type TrackSectionsWidget = t.TypeOf<typeof TrackSectionsWidget>

export const trackSections = (track: string): TrackSectionsWidget => ({
  type: 'track-sections',
  track,
  size: 8,
  ...defaultWidgetSettings()
})

export const PlayStopWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('play-stop')
})])

export const playStop = (): PlayStopWidget => ({
  type: 'play-stop',
  ...defaultWidgetSettings()
})

export type PlayStopWidget = t.TypeOf<typeof PlayStopWidget>

export const ClipNavWidget = t.intersection([WidgetSettings, t.type({
  type: t.literal('clip-nav'),
  track: t.string
})])

export type ClipNavWidget = t.TypeOf<typeof ClipNavWidget>

export const clipNav = (track: string): ClipNavWidget => ({
  type: 'clip-nav',
  track,
  ...defaultWidgetSettings()
})

export const Widget = t.union([
  TimeSignatureWidget,
  TempoWidget,
  BeatCounterWidget,
  BarBeatWidget,
  BeatCountWidget,
  ActiveTrackClipWidget,
  TrackSectionsWidget,
  PlayStopWidget,
  ClipNavWidget
])

export type Widget = t.TypeOf<typeof Widget>

export const Widgets = t.array(Widget)

export type Widgets = t.TypeOf<typeof Widgets>

export const emptyWidgets: Widgets = []

export const widgetsAtom = atomWithStorage('widgets', emptyWidgets)

export const editWidgetsAtom = atom(false)

export const addWidget = (widget: Widget): (w: Widgets) => Widgets => {
  return produce<Widgets>(widgets => {
    widgets.push(widget)
  })
}

export const removeWidget = (widget: Widget): (w: Widgets) => Widgets => {
  return produce<Widgets>(widgets => {
    widgets.splice(current(widgets).indexOf(widget), 1)
  })
}

export const moveRightWidget = (widget: Widget): (w: Widgets) => Widgets => {
  return produce<Widgets>(widgets => {
    const widgetIndex = current(widgets).indexOf(widget)
    widgets.splice(widgetIndex, 1)
    widgets.splice(widgetIndex + 1, 0, widget)
  })
}

export const moveLeftWidget = (widget: Widget): (w: Widgets) => Widgets => {
  return produce<Widgets>(widgets => {
    const widgetIndex = current(widgets).indexOf(widget)
    widgets.splice(widgetIndex, 1)
    widgets.splice(widgetIndex - 1, 0, widget)
  })
}