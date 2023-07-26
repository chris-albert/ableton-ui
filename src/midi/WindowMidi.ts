import {EventEmitter, EventRecord} from "../utils/EventEmitter";

const CHANNEL_MASK          = 0x0F

const SYSEX_STATUS          = 0xF0
const NOTE_ON_STATUS        = 0x90
const NOTE_OFF_STATUS       = 0x80
const CONTROL_CHANGE_STATUS = 0xB0
const PROGRAM_CHANGE_STATUS = 0xC0

const MTC_QUARTER_FRAME_STATUS = 0xF1
const TIMING_CLOCK_STATUS      = 0xF8
const MEASURE_END_STATUS       = 0xF9
const START_STATUS             = 0xFA
const CONTINUE_STATUS          = 0xFB
const STOP_STATUS              = 0xFC
const ACTIVE_SENSING_STATUS    = 0xFE
const RESET_STATUS             = 0xFF

export type CommonMidiMessage = {
    raw: Uint8Array
    time: Date
}

export type MidiChannel = {
    channel: number
}

export type SysExMessage = {
    type: 'sysex',
    data: Uint8Array
} & CommonMidiMessage

export type NoteOnMessage = {
    type: 'noteon',
    note: number
    velocity: number
} & CommonMidiMessage & MidiChannel

export type NoteOffMessage = {
    type: 'noteoff',
    note: number
    velocity: number
} & CommonMidiMessage & MidiChannel

export type ControlChangeMessage = {
    type: 'cc',
    controllerNumber: number
    data: number
} & CommonMidiMessage & MidiChannel

export type ProgramChangeMessage = {
    type: 'pc',
    programNumber: number
} & CommonMidiMessage & MidiChannel

export type ClockMessage = {
    type: 'clock',
} & CommonMidiMessage

export type MeasureEndMessage = {
    type: 'measureend',
} & CommonMidiMessage

export type StartMessage = {
    type: 'start',
} & CommonMidiMessage

export type ContinueMessage = {
    type: 'continue',
} & CommonMidiMessage

export type StopMessage = {
    type: 'stop',
} & CommonMidiMessage

export type ResetMessage = {
    type: 'reset',
} & CommonMidiMessage

export type ActiveSensingMessage = {
    type: 'activesensing',
} & CommonMidiMessage

export type MTCQuarterFrameMessage = {
    type: 'mtcquarterframe',
    data: number
} & CommonMidiMessage

export type UnknownMessage = {
    type: 'unknown',
} & CommonMidiMessage

export type ErrorMessage = {
    type: 'error',
    message: string
} & CommonMidiMessage

export type MidiMessage =
  SysExMessage |
  NoteOnMessage |
  NoteOffMessage |
  ControlChangeMessage |
  ProgramChangeMessage |
  ClockMessage |
  MeasureEndMessage |
  StartMessage |
  ContinueMessage |
  StopMessage |
  ResetMessage |
  ActiveSensingMessage |
  MTCQuarterFrameMessage |
  UnknownMessage |
  ErrorMessage

export const parseMidiInput = (input: any): MidiMessage => {
    const time = new Date()
    if(input.data !== undefined) {
        const common = {
            raw: input.data,
            time
        }
        const data: Uint8Array = input.data
        const status = data[0]
        // console.log('status', status, status & NOTE_ON_STATUS, NOTE_ON_STATUS)
        if(status === SYSEX_STATUS) {
            return {
                type: 'sysex',
                data: data.slice(1, -1),
                ...common
            }
        } else if((status & NOTE_ON_STATUS) === NOTE_ON_STATUS) {
            return {
                type: 'noteon',
                channel: (CHANNEL_MASK & status) + 1,
                note: data[1],
                velocity: data[2],
                ...common
            }
        } else if((status & NOTE_OFF_STATUS) === NOTE_OFF_STATUS) {
            return {
                type: 'noteoff',
                channel: (CHANNEL_MASK & status) + 1,
                note: data[1],
                velocity: data[2],
                ...common
            }
        } else if((status & CONTROL_CHANGE_STATUS) === CONTROL_CHANGE_STATUS) {
            return {
                type: 'cc',
                channel: (CHANNEL_MASK & status) + 1,
                controllerNumber: data[1],
                data: data[2],
                ...common
            }
        } else if((status & PROGRAM_CHANGE_STATUS) === PROGRAM_CHANGE_STATUS) {
            return {
                type: 'pc',
                channel: (CHANNEL_MASK & status) + 1,
                programNumber: data[1],
                ...common
            }
        } else if(status === TIMING_CLOCK_STATUS) {
            return {
                type: 'clock',
                ...common
            }
        } else if(status === MEASURE_END_STATUS) {
            return {
                type: 'measureend',
                ...common
            }
        } else if(status === START_STATUS) {
            return {
                type: 'start',
                ...common
            }
        } else if(status === CONTINUE_STATUS) {
            return {
                type: 'continue',
                ...common
            }
        } else if(status === STOP_STATUS) {
            return {
                type: 'stop',
                ...common
            }
        } else if(status === RESET_STATUS) {
            return {
                type: 'reset',
                ...common
            }
        } else if(status === ACTIVE_SENSING_STATUS) {
            return {
                type: 'activesensing',
                ...common
            }
        } else if(status === MTC_QUARTER_FRAME_STATUS) {
            return {
                type: 'mtcquarterframe',
                data: data[1],
                ...common
            }
        } else {
            return {
                type: 'unknown',
                ...common
            }
        }
    }
    return {
        type: 'error',
        message: 'No data in MIDI message',
        raw: {} as Uint8Array,
        time
    }
}

export type MidiPort = {
    type: 'input' | 'output'
    id: string
    name: string
    manufacturer: string
    onstatechange: (i: any) => void
    state: 'connected' | 'disconnected'
    connection: 'open' | 'closed' | 'pending'
    version: string
}

export type MidiMessageType = MidiMessage['type'] | '*'

type MidiEventRecord = EventRecord<MidiMessage>

export type MidiInput = MidiPort & {
    type: 'input'
} & Omit<EventEmitter<MidiEventRecord>, 'emit'>

export type MidiOutput = MidiPort & {
    type: 'output'
    send: (i: MidiMessage) => void
}

export const buildInputDevice = (input: any): MidiInput => {

    const emitter = EventEmitter<MidiEventRecord>()
    input.onmidimessage = ((rawMessage: any) => {
        const midiMessage = parseMidiInput(rawMessage)
        emitter.emit(midiMessage)
    })

    return {
        id: input.id,
        name: input.name,
        manufacturer: input.manufacturer,
        onstatechange: input.onstatechange,
        state: input.state,
        connection: input.connection,
        version: input.version,
        type: 'input',
        on: emitter.on
    }
}

export const buildOutputDevice = (output: any): MidiOutput => {
    return {
        id: output.id,
        name: output.name,
        manufacturer: output.manufacturer,
        onstatechange: output.onstatechange,
        state: output.state,
        connection: output.connection,
        version: output.version,
        type: 'output',
        send: (msg: MidiMessage) => {
            output.send(msg.raw)

        }
    }
}

export type WindowMidi = {
    inputs: Array<MidiInput>
    outputs: Array<MidiOutput>
}

export const renderRawAsInt = (raw: Uint8Array): string => {
    return `[${raw.join(', ')}]`
}
export const renderRawAsHex = (raw: Uint8Array): string => {
    const arr: Array<string> = []
    raw.forEach(value => arr.push(value.toString(16)))
    return `[${arr.join(', ')}]`
}