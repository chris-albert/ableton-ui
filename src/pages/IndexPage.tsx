import React from 'react'
import {Body} from "../Body";
import {MidiInput} from "../midi/WindowMidi";

export type IndexPageProps = {
  midiInput: MidiInput
}

export const IndexPage: React.FC<IndexPageProps> = ({
  midiInput
}) => {

  return (
    <Body midiInput={midiInput} />
  )
}
