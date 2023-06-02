import _ from 'lodash'
import {EventEmitter, EventRecord} from "../utils/EventEmitter";

const CHANNEL_MASK = 0x0F

const SYSEX_STATUS = 0xF0
const NOTE_ON_STATUS = 0x90
const NOTE_OFF_STATUS = 0x80

const MIDI_MESSAGE = 'midimessage'

export type CommonMidiMessage = {
    raw: Uint8Array
    time: Date
}

export type SysExMessage = {
    type: 'sysex',
    data: Uint8Array
} & CommonMidiMessage

export type NoteOnMessage = {
    type: 'noteon',
    channel: number,
    note: number
    velocity: number
} & CommonMidiMessage

export type NoteOffMessage = {
    type: 'noteoff',
    channel: number,
    note: number
    velocity: number
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
  NoteOffMessage|
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