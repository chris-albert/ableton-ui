import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiOutput} from "../midi/WindowMidi";
import {midiTXStatusAtom, useSetMidiOutput, useWindowMidi} from "../hooks/Midi";
import {StatusLedComponent} from "./StatusLedComponent";
import {Box} from "@mui/material";
import {useAtomValue} from "jotai";

export type MidiOutputComponentProps = {}

export const MidiOutputComponent: React.FC<MidiOutputComponentProps> = ({}) => {

  const [items, setItems] = React.useState<Array<SelectItem<MidiOutput>>>([])

  const windowMidi = useWindowMidi()
  const setMidiOutput = useSetMidiOutput()

  React.useEffect(() => {
    if(windowMidi !== undefined) {
      setItems(windowMidi.outputs.map((device, i) => {
        return {
          label: device.name,
          value: device
        }
      }))
    }
  }, [windowMidi])

  const onMidiSelect = (output: MidiOutput | undefined) => {
    if(output !== undefined) {
      setMidiOutput(output)
    }
  }

  const midiStatus = useAtomValue(midiTXStatusAtom)

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <SelectComponent
        label='MIDI Output'
        items={items}
        onChange={onMidiSelect}
      />
      <StatusLedComponent on={midiStatus}/>
    </Box>
  )
}
