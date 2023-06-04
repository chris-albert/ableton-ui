import React from 'react'
import {Body} from "../Body";
import {MidiInput} from "../midi/WindowMidi";
import {parseAbletonUIMessage} from "../model/AbletonUIMessage";
import {useSetAtom} from "jotai";
import {addTrackToProject, fromUIMessage, projectAtom} from "../model/UIStateDisplay";

export type IndexPageProps = {
  midiInput: MidiInput
}

export const IndexPage: React.FC<IndexPageProps> = ({
  midiInput
}) => {

  const setProject = useSetAtom(projectAtom)

  React.useEffect(() => {
    return midiInput.on('sysex', sysex => {
      const msg = parseAbletonUIMessage(sysex.raw)
      if(msg.type === 'init') {
        setProject(project =>
          addTrackToProject(
            project,
            fromUIMessage(msg.track)
          )
        )
      }
    })
  }, [])

  return (
    <Body midiInput={midiInput} />
  )
}
