import React from 'react'
import {WindowMidi} from "../midi/WindowMidi";
import getMidiAccess from "../midi/MidiAccess";

const NotFoundWindowMidi = (): WindowMidi => {
    throw new Error("Trying to use MidiContext without using MidiProvider.")
}

export const MidiContext: React.Context<() => WindowMidi> =
    React.createContext(NotFoundWindowMidi)

export const MidiProvider = MidiContext.Provider

export const useMidi = () => {
    return React.useContext(MidiContext)()
}

export const useMidiContext = () => {
    const [midi, setMidi] = React.useState<WindowMidi | undefined>()

    React.useEffect(() => {
        getMidiAccess(true)
            .then(midi => {
                setMidi(midi)
            })
            .catch(console.error)
    }, [])

    return midi
}