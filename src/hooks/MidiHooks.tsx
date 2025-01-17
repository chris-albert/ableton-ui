import React from 'react'
import { useAtomValue } from 'jotai/index'
import { Midi, MidiDevices, MidiDeviceType, MidiType } from '../midi/GlobalMidi'
import { MidiPort } from '../midi/WindowMidi'
import { useAtom } from 'jotai'
import { Option } from 'effect'

const useWindowMidi = () => useAtomValue(Midi.atoms.windowMidi)

const useMidiDevices = (midiType: MidiType, deviceType: MidiDeviceType): MidiDevices => {
  const windowMidi = useWindowMidi()

  const devices = React.useMemo(() => {
    const ports: Array<MidiPort> = deviceType === 'input' ? windowMidi.inputs : windowMidi.outputs
    return ports.map((p) => p.name)
  }, [windowMidi])

  const [selected, setSelected] = useAtom(Midi.getSelected(midiType, deviceType))

  return {
    type: deviceType,
    devices,
    selected: Option.getOrUndefined(selected),
    setSelected: (s: string | undefined) => {
      setSelected(Option.fromNullable(s))
    },
  }
}

export const MidiHooks = {
  useWindowMidi,
  useMidiDevices,
}
