import _ from 'lodash'

const CHANNEL_MASK = 0x0F

const SYSEX_STATUS = 0xF0
const NOTE_ON_STATUS = 0x80
const NOTE_OFF_STATUS = 0x90

const MIDI_MESSAGE = 'midimessage'

export type SysExMessage = {
    type: 'sysex',
    data: Uint8Array
}

export type NoteOnMessage = {
    type: 'noteon',
    channel: number,
    note: number
    velocity: number
}


export type UnknownMessage = {
    type: 'unknown',
    data: any
}

export type MidiMessage = SysExMessage | NoteOnMessage| UnknownMessage

export const parseMidiInput = (input: any): MidiMessage => {
    if(input.data !== undefined) {
        const data: Uint8Array = input.data
        const status = data[0]
        if(status === SYSEX_STATUS) {
            return {
                type: 'sysex',
                data: data.slice(1, -1)
            }
        } else if((status & NOTE_ON_STATUS) === NOTE_ON_STATUS) {
            return {
                type: 'noteon',
                channel: (CHANNEL_MASK & status) + 1,
                note: data[1],
                velocity: data[2]
            }
        }
        console.log('status byte', status)

    }
    return {
        type: 'unknown',
        data: input
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

export type MidiInput = MidiPort & {
    type: 'input'
    on: (s: MidiMessageType, f: (i: MidiMessage) => void) => void
}

export type MidiOutput = MidiPort & {
    type: 'output'
    send: (i: MidiMessage) => void
}

export const buildInputDevice = (input: any): MidiInput => {
    const listeners: Array<[MidiMessageType, (m: MidiMessage) => void]> = []
    input.onmidimessage = ((rawMessage: any) => {
        const midiMessage = parseMidiInput(rawMessage)
        listeners.forEach(l =>  {
            const [type, cb] = l
            if(type === midiMessage.type) {
                cb(midiMessage)
            } else if(type === '*') {
                cb(midiMessage)
            }
        })
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
        on: (s: MidiMessageType, f: (i: MidiMessage) => void): void => {
            listeners.push([s, f])
        }
    }
}

export type WindowMidi = {
    inputs: Array<MidiInput>
    outputs: Array<MidiOutput>
}