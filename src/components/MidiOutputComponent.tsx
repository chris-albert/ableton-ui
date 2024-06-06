import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiOutput} from "../midi/WindowMidi";
import {
  midiTXStatusAtom,
  useMidiOutputSelected,
  useSetMidiOutput,
  useWindowMidi
} from "../hooks/Midi";
import {StatusLedComponent} from "./StatusLedComponent";
import {Box} from "@mui/material";
import {useAtomValue} from "jotai";
import _ from 'lodash'

export type MidiOutputComponentProps = {}

export const MidiOutputComponent: React.FC<MidiOutputComponentProps> = ({}) => {

  const [items, setItems] = React.useState<Array<SelectItem<MidiOutput>>>([])

  const windowMidi = useWindowMidi()
  const setMidiOutput = useSetMidiOutput()
  const [midiOutputSelected, setMidiOutputSelected] = useMidiOutputSelected()

  React.useEffect(() => {
    if(midiOutputSelected !== undefined && windowMidi !== undefined) {
      const selectedOutput = _.find(windowMidi.outputs, o => o.name === midiOutputSelected)
      if(selectedOutput !== undefined) {
        setMidiOutput(selectedOutput)
      }
    }
  }, [midiOutputSelected, windowMidi])

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
      setMidiOutputSelected(output.name)
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
        activeLabel={midiOutputSelected}
      />
      <StatusLedComponent on={midiStatus}/>
    </Box>
  )
}
