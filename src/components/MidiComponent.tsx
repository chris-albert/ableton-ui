import React from 'react'
import getMidiAccess from "../midi/MidiAccess";

export type MidiComponentProps = {}

export const MidiComponent: React.FC<MidiComponentProps> = () => {

    React.useEffect(() => {
        getMidiAccess(true)
            .then(midi => {
                console.log('got midi', midi)
                midi.inputs.map(console.log)
                midi.outputs.map(console.log)
            })
            .catch(console.error)
    }, [])
    return (
        <>hi</>
    )
}