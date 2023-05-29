import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiInput, WindowMidi} from "../midi/WindowMidi";
import {useMidi} from "../contexts/MidiContext";

export type MidiInputComponentProps = {
    midi: WindowMidi,
    onInputSelect: (i: MidiInput) => void
}

export const MidiInputComponent: React.FC<MidiInputComponentProps> = ({
    midi,
    onInputSelect
}) => {

    const [items, setItems] = React.useState<Array<SelectItem<MidiInput>>>([])

    React.useEffect(() => {
       setItems(midi.inputs.map((device, i) => {
            return {
                label: device.name,
                value: device
            }
       }) )
    }, [midi])

    const onMidiSelect = (input: MidiInput | undefined) => {
        if(input !== undefined) {

            // input.on('sysex', sysex => {
            //     const json = byteArrayToJson(sysex.data)
            //     console.log('message json', json)
            // })
            onInputSelect(input)
        }
    }

    return (
        <SelectComponent
            label='MIDI Input'
            items={items}
            onChange={onMidiSelect}
        />
    )
}