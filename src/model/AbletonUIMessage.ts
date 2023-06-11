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

export type Clip = {
  type: 'clip'
  name: string
  color: number,
  startTime: number
  endTime: number
}

export type Track = {
  type: 'track'
  name: string
  color: number
  clips: Array<Clip>
}

export type InitMessage = {
  type: 'init'
  tracks: Array<Track>
}

export type AbletonUIMessage = BeatMessage |
  InitMessage |
  BarBeatMessage |
  TimeSignatureMessage |
  TempoMessage

export const parseAbletonUIMessage = (data: Uint8Array): AbletonUIMessage => {
  return byteArrayToJson(data) as AbletonUIMessage
}
