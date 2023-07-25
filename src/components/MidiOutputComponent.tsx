import React from 'react'
import {SelectComponent, SelectItem} from "./SelectComponent";
import {MidiOutput} from "../midi/WindowMidi";
import {useSetMidiOutput, useWindowMidi} from "../hooks/Midi";

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

  return (
    <SelectComponent
      label='MIDI Output'
      items={items}
      onChange={onMidiSelect}
    />
  )
}
