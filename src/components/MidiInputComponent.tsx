import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiInput} from "../midi/WindowMidi";
import {useSetMidiInput, useWindowMidi} from "../hooks/Midi";

export type MidiInputComponentProps = {}

export const MidiInputComponent: React.FC<MidiInputComponentProps> = () => {

  const [items, setItems] = React.useState<Array<SelectItem<MidiInput>>>([])

  const windowMidi = useWindowMidi()
  const setMidiInput = useSetMidiInput()

  React.useEffect(() => {
    if(windowMidi !== undefined) {
      setItems(windowMidi.inputs.map((device, i) => {
        return {
          label: device.name,
          value: device
        }
      }))
    }
  }, [windowMidi])

  const onMidiSelect = (input: MidiInput | undefined) => {
    if(input !== undefined) {
      setMidiInput(input)
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
