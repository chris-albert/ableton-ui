import React from 'react'
import {useMidi} from "../hooks/useMidi";
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiInput} from "../midi/WindowMidi";
import {byteArrayToJson} from "../utils/Converters";

export type MidiInputComponentProps = {}

export const MidiInputComponent: React.FC<MidiInputComponentProps> = ({

}) => {

    const midi = useMidi()
    const [items, setItems] = React.useState<Array<SelectItem<MidiInput>>>([])

    React.useEffect(() => {
        if(midi !== undefined) {
           setItems(midi.inputs.map((device, i) => {
                return {
                    label: device.name,
                    value: device
                }
           }) )
        }
    }, [midi])

    const onMidiSelect = (input: MidiInput | undefined) => {
        if(input !== undefined) {

            input.on('sysex', sysex => {
                const json = byteArrayToJson(sysex.data)
                console.log('message json', json)
            })
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
