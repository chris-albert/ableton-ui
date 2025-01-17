import React from 'react'
import { SelectComponent, SelectItem } from './SelectComponent'
import { MidiInput } from '../midi/WindowMidi'
import { midiRXStatusAtom, useMidiInputSelected, useSetMidiInput, useWindowMidi } from '../hooks/Midi'
import { Box, Radio } from '@mui/material'
import { StatusLedComponent } from './StatusLedComponent'
import { useAtomValue } from 'jotai'
import _ from 'lodash'
import { Midi } from '../midi/GlobalMidi'
import { MidiHooks } from '../hooks/MidiHooks'

export type MidiInputComponentProps = {}

export const MidiInputComponent: React.FC<MidiInputComponentProps> = () => {
  const [items, setItems] = React.useState<Array<SelectItem<MidiInput>>>([])

  const windowMidi = MidiHooks.useWindowMidi()
  const setMidiInput = useSetMidiInput()
  const [midiInputSelected, setMidiInputSelected] = useMidiInputSelected()

  React.useEffect(() => {
    if (midiInputSelected !== undefined && windowMidi !== undefined) {
      const selectedInput = _.find(windowMidi.inputs, (i) => i.name === midiInputSelected)
      if (selectedInput !== undefined) {
        setMidiInput(selectedInput)
      }
    }
  }, [midiInputSelected, windowMidi])

  React.useEffect(() => {
    if (windowMidi !== undefined) {
      setItems(
        windowMidi.inputs.map((device, i) => {
          return {
            label: device.name,
            value: device,
          }
        }),
      )
    }
  }, [windowMidi])

  const onMidiSelect = (input: MidiInput | undefined) => {
    if (input !== undefined) {
      setMidiInputSelected(input.name)
    }
  }

  const midiStatus = useAtomValue(midiRXStatusAtom)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <SelectComponent
        label='MIDI Input'
        items={items}
        onChange={onMidiSelect}
        activeLabel={midiInputSelected}
      />
      <StatusLedComponent on={midiStatus} />
    </Box>
  )
}
