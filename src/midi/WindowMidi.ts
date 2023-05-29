import _ from 'lodash'

const SYSEX_CONTROL = 0xF0
const MIDI_MESSAGE = 'midimessage'

export type SysExMessage = {
    type: 'sysex',
    data: Uint8Array
}

export type UnknownMessage = {
    type: 'unknown',
    data: any
}

export type MidiMessage = SysExMessage | UnknownMessage

export const parseMidiInput = (input: any): MidiMessage => {
    if(input.data !== undefined) {
        const data: Uint8Array = input.data
        const control = data[0]
        if(control === SYSEX_CONTROL) {
            return {
                type: 'sysex',
                data: data.slice(1, -1)
            }
        }
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

export type MidiInput = MidiPort & {
    type: 'input'
    on: (s: string, f: (i: MidiMessage) => void) => void
}

export type MidiOutput = MidiPort & {
    type: 'output'
    send: (i: MidiMessage) => void
}

export const buildInputDevice = (input: any): MidiInput => {
    const listeners: Array<[string, (m: MidiMessage) => void]> = []
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
        on: (s: string, f: (i: MidiMessage) => void): void => {
            listeners.push([s, f])
        }
    }
}

export type WindowMidi = {
    inputs: Array<MidiInput>
    outputs: Array<MidiOutput>
}