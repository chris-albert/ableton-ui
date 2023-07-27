import _ from "lodash";
import {SysExMessage} from "../midi/WindowMidi";

const DATA_DELIMITER = 0x01
const MANUFACTURER_ID = 0x02

type MessageParser = {
  statusByte: number,
  parse: (input: Array<any>) => AbletonUIMessage
}

const RX_STATUS: Record<string, MessageParser> = {
  INIT: {
    statusByte: 0x03,
    parse: (input: Array<any>) => {
      return {
        type: 'init-project',
        tracksCount: input[0]
      }
    }
  },
  DONE: {
    statusByte: 0x04,
    parse: (input: Array<any>) => {
      return {
        type: 'init-done'
      }
    }
  },

  TRACK: {
    statusByte: 0x05,
    parse: (input: Array<any>) => {
      return {
        type: 'init-track',
        name: input[0],
        trackIndex: _.toNumber(input[1]),
        color: _.toNumber(input[2])
      }
    }
  },
  CLIP: {
    statusByte: 0x06,
    parse: (input: Array<any>) => {
      return {
        type: 'init-clip',
        name: input[0],
        trackIndex: _.toNumber(input[1]),
        clipIndex: _.toNumber(input[2]),
        color: _.toNumber(input[3]),
        startTime: _.toNumber(input[4]),
        endTime: _.toNumber(input[5])
      }
    }
  },
  BEAT: {
    statusByte: 0x07,
    parse: (input: Array<any>) => {
      return {
        type: 'beat',
        value: _.toNumber(input[0])
      }
    }
  },
  BAR_BEAT: {
    statusByte: 0x08,
    parse: (input: Array<any>) => {
      return {
        type: 'bar-beat',
        value: _.toNumber(input[0])
      }
    }
  },
  SIG: {
    statusByte: 0x09,
    parse: (input: Array<any>) => {
      return {
        type: 'sig',
        numer: _.toNumber(input[0]),
        denom: _.toNumber(input[1]),
      }
    }
  },
  TEMPO: {
    statusByte: 0x0A,
    parse: (input: Array<any>) => {
      return {
        type: 'tempo',
        value: _.toNumber(input[0])
      }
    }
  },
  IS_PLAYING: {
    statusByte: 0x0B,
    parse: (input: Array<any>) => {
      return {
        type: 'is-playing',
        value: _.toNumber(input[0]) === 1
      }
    }
  }
}

const RX_STATUS_LOOKUP: Record<number, MessageParser> = _.fromPairs(_.map(RX_STATUS, (messageParser) => {
  return [
    messageParser.statusByte,
    messageParser
  ]
}))

export type BeatMessage = {
  type: 'beat'
  value: number
}

export type BarBeatMessage = {
  type: 'bar-beat'
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

export type IsPlayingMessage = {
  type: 'is-playing'
  value: boolean
}

export type InitProjectMessage = {
  type: 'init-project'
  tracksCount: number
}

export type InitTrackMessage = {
    type: 'init-track'
    trackIndex: number
    name: string
    color: number
}

export type InitClipMessage = {
  type: 'init-clip'
  trackIndex: number
  clipIndex: number
  name: string
  color: number
  startTime: number
  endTime: number
}


export type InitDoneMessage = {
  type: 'init-done'
}

export type AbletonUIMessage = BeatMessage |
  InitProjectMessage |
  InitTrackMessage |
  InitClipMessage |
  InitDoneMessage |
  BarBeatMessage |
  TimeSignatureMessage |
  TempoMessage |
  IsPlayingMessage

export const parseAbletonUIMessage = (data: Uint8Array): AbletonUIMessage | undefined => {

  try {
    const message = parseRawSysex(data)
    if(message.manufacturer === MANUFACTURER_ID) {
      const parser = RX_STATUS_LOOKUP[message.statusByte]
      if(parser !== undefined) {
          return parser.parse(message.body)
      } else {
        console.warn("Did not find parser for message", message)
      }
    }
  } catch (err) {
    console.error(`Got error parsing message`, err)
  }

  return undefined
}

type RawSysexMessage = {
  manufacturer: number
  statusByte: number
  body: Array<any>
}

const parseRawSysex = (data: Uint8Array): RawSysexMessage => {
  const contents = data.slice(1)
  const str = _.join(_.map(contents, value => String.fromCharCode(value)), '')
  const splitStr = _.split(str, String.fromCharCode(DATA_DELIMITER))
  return {
    manufacturer: data[0],
    statusByte: _.toNumber(splitStr[0]),
    body: splitStr.splice(1)
  }
}

export const generateRawSysex = (sysex: RawSysexMessage): Uint8Array => {
  const arr = [0xF0, sysex.manufacturer, sysex.statusByte]
  const withBody = arr.concat(sysex.body)
  withBody.push(0xF7)
  return withBody as any as Uint8Array
}

export const TX_MESSAGE = {
  base: (statusByte: number, body: Array<any>): SysExMessage => {
    const raw = generateRawSysex({
      manufacturer: MANUFACTURER_ID,
      statusByte,
      body
    })
    return {
      type: 'sysex',
      data: raw,
      raw,
      time: new Date()
    }
  },
  play: () => {
    return TX_MESSAGE.base(0x50, [1])
  },
  stop: () => {
    return TX_MESSAGE.base(0x50, [0])
  }
}
