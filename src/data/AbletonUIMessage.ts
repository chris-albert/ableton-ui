
export type BeatMessage = {
  type: 'beat'
  value: number
}

export type Clip = {
  type: 'clip'
  name: string
  color: number,
  startTime: number
  endTime: number | undefined
}

export type Track = {
  type: 'track'
  name: string
  color: number
  clips: Array<Clip>
}

export type InitMessage = {
  type: 'init'
  track: Track
}

export type AbletonUIMessage = BeatMessage | InitMessage

export const parseAbletonUIMessage = (data: any): AbletonUIMessage =>
  data as AbletonUIMessage