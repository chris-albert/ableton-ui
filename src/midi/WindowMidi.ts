import {EventEmitter, EventRecord} from "../utils/EventEmitter";
import * as t from 'io-ts'
import _ from "lodash";

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

const DATA_DELIMITER = 0x01


export const MidiChannel = t.type({
    channel: t.number
})
export type MidiChannel = t.TypeOf<typeof MidiChannel>

export const SysExMessage = t.type({
    type: t.literal('sysex'),
    manufacturer: t.number,
    statusByte: t.number,
    body: t.array(t.any)
})

export type SysExMessage = t.TypeOf<typeof SysExMessage>

export const NoteOnMessage = t.intersection([MidiChannel, t.type({
    type: t.literal('noteon'),
    note: t.number,
    velocity: t.number
})])

export type NoteOnMessage = t.TypeOf<typeof NoteOnMessage>

export const NoteOffMessage = t.intersection([MidiChannel, t.type({
    type: t.literal('noteoff'),
    note: t.number,
    velocity: t.number
})])

export type NoteOffMessage = t.TypeOf<typeof NoteOffMessage>

export const ControlChangeMessage = t.intersection([MidiChannel, t.type({
    type: t.literal('cc'),
    controllerNumber: t.number,
    data: t.number
})])

export type ControlChangeMessage = t.TypeOf<typeof ControlChangeMessage>

export const ProgramChangeMessage = t.intersection([MidiChannel, t.type({
    type: t.literal('pc'),
    programNumber: t.number
})])

export type ProgramChangeMessage = t.TypeOf<typeof ProgramChangeMessage>

export const ClockMessage = t.type({
    type: t.literal('clock'),
})
export type ClockMessage = t.TypeOf<typeof ClockMessage>

export const MeasureEndMessage = t.type({
    type: t.literal('measureend')
})
export type MeasureEndMessage = t.TypeOf<typeof MeasureEndMessage>

export const StartMessage = t.type({
    type: t.literal('start')
})
export type StartMessage = t.TypeOf<typeof StartMessage>

export const ContinueMessage = t.type({
    type: t.literal('continue')
})
export type ContinueMessage = t.TypeOf<typeof ContinueMessage>

export const StopMessage = t.type({
    type: t.literal('stop')
})
export type StopMessage = t.TypeOf<typeof StopMessage>

export const ResetMessage = t.type({
    type: t.literal('reset')
})
export type ResetMessage = t.TypeOf<typeof ResetMessage>

export const ActiveSensingMessage = t.type({
    type: t.literal('activesensing')
})
export type ActiveSensingMessage = t.TypeOf<typeof ActiveSensingMessage>

export const MTCQuarterFrameMessage = t.type({
    type: t.literal('mtcquarterframe'),
    data: t.number
})
export type MTCQuarterFrameMessage = t.TypeOf<typeof MTCQuarterFrameMessage>

export const UnknownMessage = t.type({
    type: t.literal('unknown')
})
export type UnknownMessage = t.TypeOf<typeof UnknownMessage>

export const ErrorMessage = t.type({
    type: t.literal('error'),
    message: t.string
})
export type ErrorMessage = t.TypeOf<typeof ErrorMessage>


export const MidiMessage = t.union([
    SysExMessage,
    NoteOnMessage,
    NoteOffMessage,
    ControlChangeMessage,
    ProgramChangeMessage,
    ClockMessage,
    MeasureEndMessage,
    StartMessage,
    ContinueMessage,
    StopMessage,
    ResetMessage,
    ActiveSensingMessage,
    MTCQuarterFrameMessage,
    UnknownMessage,
    ErrorMessage
])

export type MidiMessage = t.TypeOf<typeof MidiMessage>

export type MidiMessageWithRaw = MidiMessage & {
    raw: Uint8Array
    time: Date
}

export const parseMidiInput = (input: any): MidiMessageWithRaw => {
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
                ...parseRawSysex(data.slice(1, -1)),
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

type MidiEventRecord = EventRecord<MidiMessageWithRaw>

export type MidiInput = MidiPort & {
    type: 'input'
} & Omit<EventEmitter<MidiEventRecord>, 'emit'>

export type MidiOutput = MidiPort & {
    type: 'output'
    send: (i: MidiMessage) => void
}

const parseRawSysex = (data: Uint8Array): SysExMessage => {
    const contents = data.slice(1)
    const str = _.join(_.map(contents, value => String.fromCharCode(value)), '')
    const splitStr = _.split(str, String.fromCharCode(DATA_DELIMITER))
    return {
        type: 'sysex',
        manufacturer: data[0],
        statusByte: _.toNumber(splitStr[0]),
        body: splitStr.splice(1)
    }
}

export const generateRawSysex = (sysex: SysExMessage): Uint8Array => {
    const arr = [0xF0, sysex.manufacturer, sysex.statusByte]
    const withBody = arr.concat(sysex.body)
    withBody.push(0xF7)
    return withBody as any as Uint8Array
}

export const generateRawMidiMessage = (message: MidiMessage): Uint8Array => {

    if(message.type === 'sysex') {
        return generateRawSysex(message)
    } else if(message.type === 'noteon' || message.type === 'noteoff') {
        return generateNoteMessage(message)
    } else if(message.type === 'cc') {
        return generateControlChange(message)
    } else if(message.type === 'pc') {
        return generateProgramChange(message)
    } else {
        return [] as any as Uint8Array
    }
}

export const generateNoteMessage = (message: NoteOnMessage | NoteOffMessage): Uint8Array => {
    const status = message.type === 'noteon' ? NOTE_ON_STATUS : NOTE_OFF_STATUS
    const arr = [status | (message.channel - 1), message.note, message.velocity]

    return arr as any as Uint8Array
}

export const generateControlChange = (message: ControlChangeMessage): Uint8Array => {
    const arr = [CONTROL_CHANGE_STATUS | (message.channel - 1), message.controllerNumber, message.data]

    return arr as any as Uint8Array
}

export const generateProgramChange = (message: ProgramChangeMessage): Uint8Array => {
    const arr = [PROGRAM_CHANGE_STATUS | (message.channel - 1), message.programNumber]

    return arr as any as Uint8Array
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
            const raw = generateRawMidiMessage(msg)
            console.debug("Sending midi message", raw)
            output.send(raw)
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