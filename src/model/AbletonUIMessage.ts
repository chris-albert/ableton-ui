import {byteArrayToJson} from "../utils/Converters";

export type BeatMessage = {
  type: 'beat'
  value: number
}

export type BarBeatMessage = {
  type: 'barBeat'
  value: number
}

export type TimeSignatureMessage = {
  type: 'sig'
  numer: number
  denom: number
}

export type TempoMessage = {
  type: 'tempo'
  value: number
}

export type InitProjectMessage = {
  type: 'init-project'
  tracksCount: number
}

export type InitTrack = {
    trackIndex: number
    name: string
    color: number
    clipsCount: number
}

export type InitTracksMessage = {
  type: 'init-tracks'
  tracks: Array<InitTrack>
}

export type InitClip = {
  trackIndex: number
  clipIndex: number
  name: string
  color: number
  startTime: number
  endTime: number
}

export type InitClipsMessage = {
  type: 'init-clips'
  clips: Array<InitClip>
}

export type InitDoneMessage = {
  type: 'init-done'
}

export type AbletonUIMessage = BeatMessage |
  InitProjectMessage |
  InitTracksMessage |
  InitClipsMessage |
  InitDoneMessage |
  BarBeatMessage |
  TimeSignatureMessage |
  TempoMessage

export const parseAbletonUIMessage = (data: Uint8Array): AbletonUIMessage => {
  return byteArrayToJson(data) as AbletonUIMessage
}
