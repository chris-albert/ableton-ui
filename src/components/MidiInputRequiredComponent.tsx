import React from 'react'
import {MidiInput} from "../midi/WindowMidi";
import {NoMidiInputPage} from "../pages/NoMidiInputPage";
import {useMidiInput} from "../hooks/Midi";

export type MidiInputRequiredComponentProps = {
  element: (mi: MidiInput) => React.ReactElement
}

export const MidiInputRequiredComponent: React.FC<MidiInputRequiredComponentProps> = ({
  element
}) => {

  const midiInput = useMidiInput()

  if(midiInput === undefined) {
    return (
      <NoMidiInputPage />
    )
  } else {
    return element(midiInput)
  }
}
