import * as t from 'io-ts'
import {atomWithStorage} from "jotai/utils";
import {produce} from "immer"

/**
 * Time Signature
 */
export const TimeSignatureWidget = t.type({
  type: t.literal('time-signature')
})

export type TimeSignatureWidget = t.TypeOf<typeof TimeSignatureWidget>

export const timeSignature = (): TimeSignatureWidget => ({
  type: 'time-signature'
})

/**
 * Tempo
 */
export const TempoWidget = t.type({
  type: t.literal('tempo')
})

export type TempoWidget = t.TypeOf<typeof TempoWidget>

export const tempo = (): TempoWidget => ({
  type: 'tempo'
})

/**
 * Beat Counter
 */
export const BeatCounterWidget = t.type({
  type: t.literal('beat-counter')
})

export type BeatCounterWidget = t.TypeOf<typeof BeatCounterWidget>

export const beatCounter = (): BeatCounterWidget => ({
  type: 'beat-counter'
})

/**
 * Bar Beat
 */
export const BarBeatWidget = t.type({
  type: t.literal('bar-beat')
})

export type BarBeatWidget = t.TypeOf<typeof BarBeatWidget>

export const barBeat = (): BarBeatWidget => ({
  type: 'bar-beat'
})

/**
 * Beat Count
 */
export const BeatCountWidget = t.type({
  type: t.literal('beat-count')
})

export type BeatCountWidget = t.TypeOf<typeof BeatCountWidget>

export const beatCount = (): BeatCountWidget => ({
  type: 'beat-count'
})

/**
 * Active Track Clip
 */
export const ActiveTrackClipWidget = t.type({
  type: t.literal('active-track-clip'),
  track: t.string
})

export type ActiveTrackClipWidget = t.TypeOf<typeof ActiveTrackClipWidget>

export const activeTrackClip = (track: string): ActiveTrackClipWidget => ({
  type: 'active-track-clip',
  track
})

/**
 * Track Sections
 */
export const TrackSectionsWidget = t.type({
  type: t.literal('track-sections'),
  track: t.string
})

export type TrackSectionsWidget = t.TypeOf<typeof TrackSectionsWidget>

export const trackSections = (track: string): TrackSectionsWidget => ({
  type: 'track-sections',
  track
})

export const Widget = t.union([
  TimeSignatureWidget,
  TempoWidget,
  BeatCounterWidget,
  BarBeatWidget,
  BeatCountWidget,
  ActiveTrackClipWidget,
  TrackSectionsWidget
])

export type Widget = t.TypeOf<typeof Widget>

export const Widgets = t.array(Widget)

export type Widgets = t.TypeOf<typeof Widgets>

export const emptyWidgets: Widgets = []

export const widgetsAtom = atomWithStorage('widgets', emptyWidgets)

export const addWidget = (widget: Widget): (w: Widgets) => Widgets => {
  return produce<Widgets>(widgets => {
    widgets.push(widget)
  })
}