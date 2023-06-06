import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiInput, WindowMidi} from "../midi/WindowMidi";

export type MidiInputComponentProps = {
  midi: WindowMidi | undefined,
  onInputSelect: (i: MidiInput) => void
}

export const MidiInputComponent: React.FC<MidiInputComponentProps> = ({
  midi,
  onInputSelect
}) => {

  const [items, setItems] = React.useState<Array<SelectItem<MidiInput>>>([])

  React.useEffect(() => {
    if(midi !== undefined) {
      setItems(midi.inputs.map((device, i) => {
        return {
          label: device.name,
          value: device
        }
      }))
    }
  }, [midi])

  const onMidiSelect = (input: MidiInput | undefined) => {
    if(input !== undefined) {
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
