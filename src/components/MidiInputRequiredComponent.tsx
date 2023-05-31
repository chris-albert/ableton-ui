import React from 'react'
import {MidiInput} from "../midi/WindowMidi";
import {NoMidiInputPage} from "../pages/NoMidiInputPage";

export type MidiInputRequiredComponentProps = {
  midiInput: MidiInput | undefined
  element: (mi: MidiInput) => React.ReactElement
}

export const MidiInputRequiredComponent: React.FC<MidiInputRequiredComponentProps> = ({
  midiInput,
  element
}) => {

  if(midiInput === undefined) {
    return (
      <NoMidiInputPage />
    )
  } else {
    return element(midiInput)
  }
}
