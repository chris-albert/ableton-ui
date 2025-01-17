import React from 'react'
import { Box } from '@mui/material'
import { SelectComponent, SelectItem } from '../SelectComponent'
import { midiTXStatusAtom } from '../../hooks/Midi'
import { useAtomValue } from 'jotai/index'
import { StatusLedComponent } from '../StatusLedComponent'
import { MidiDeviceType, MidiType } from '../../midi/GlobalMidi'
import _ from 'lodash'
import { MidiHooks } from '../../hooks/MidiHooks'

type MidiSelectComponentProps = {
  midiType: MidiType
  midiDeviceType: MidiDeviceType
}

export const MidiSelectComponent: React.FC<MidiSelectComponentProps> = ({ midiType, midiDeviceType }) => {
  const midiDevices = MidiHooks.useMidiDevices(midiType, midiDeviceType)

  const [items, setItems] = React.useState<Array<SelectItem>>([])

  React.useEffect(() => {
    setItems(
      midiDevices.devices.map((name) => {
        return {
          label: name,
          value: name,
        }
      }),
    )
  }, [midiDevices.devices])

  const onMidiSelect = (output: string | undefined) => {
    midiDevices.setSelected(output)
  }

  const midiStatus = useAtomValue(midiTXStatusAtom)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <SelectComponent
        label={`MIDI ${_.capitalize(midiDevices.type)}`}
        items={items}
        onChange={onMidiSelect}
        activeLabel={midiDevices.selected}
      />
      <StatusLedComponent on={midiStatus} />
    </Box>
  )
}
