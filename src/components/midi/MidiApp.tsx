import React from 'react'
import { useAtomValue } from 'jotai'
import { Midi } from '../../midi/GlobalMidi'
import { MidiTarget } from '../../midi/MidiTarget'
import { Option } from 'effect'

type MidiAppProps = {}

export const MidiApp: React.FC<MidiAppProps> = () => {
  const midiInput = useAtomValue(Midi.atoms.controller.midi.input)
  const midiOutput = useAtomValue(Midi.atoms.controller.midi.output)

  const body = Option.zipWith(midiInput, midiOutput, (input, output) => (
    <midi-device
      name='controller'
      input={input}
      output={output}>
      <midi-input
        target={MidiTarget.note(11)}
        on={(m) => console.log('react-midi message', m)}
      />
      <midi-output
        target={MidiTarget.note(11)}
        value={10}
      />
    </midi-device>
  ))
  return <midi-universe>{Option.getOrElse(body, () => null)}</midi-universe>
}
