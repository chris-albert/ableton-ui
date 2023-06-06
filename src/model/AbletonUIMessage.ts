import {byteArrayToJson} from "../utils/Converters";

export type BeatMessage = {
  type: 'beat'
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

export type AbletonUIMessage = BeatMessage | InitMessage

export const parseAbletonUIMessage = (data: Uint8Array): AbletonUIMessage => {
  return byteArrayToJson(data) as AbletonUIMessage
}
