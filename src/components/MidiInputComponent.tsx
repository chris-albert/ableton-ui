import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiInput} from "../midi/WindowMidi";
import {midiRXStatusAtom, useSetMidiInput, useWindowMidi} from "../hooks/Midi";
import {Box, Radio} from "@mui/material";
import {StatusLedComponent} from "./StatusLedComponent";
import {useAtomValue} from "jotai";

export type MidiInputComponentProps = {}

export const MidiInputComponent: React.FC<MidiInputComponentProps> = () => {

  const [items, setItems] = React.useState<Array<SelectItem<MidiInput>>>([])

  const windowMidi = useWindowMidi()
  const setMidiInput = useSetMidiInput()

  React.useEffect(() => {
    if(windowMidi !== undefined) {
      setItems(windowMidi.inputs.map((device, i) => {
        console.log(device)
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

  const midiStatus = useAtomValue(midiRXStatusAtom)

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <SelectComponent
        label='MIDI Input'
        items={items}
        onChange={onMidiSelect}
      />
      <StatusLedComponent on={midiStatus}/>
    </Box>
  )
}
