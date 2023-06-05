import React from 'react'
import {MidiInput} from "../midi/WindowMidi";
import {parseAbletonUIMessage} from "../model/AbletonUIMessage";
import {useSetAtom} from "jotai";
import {addTrackToProject, fromUIMessage, projectAtom} from "../model/UIStateDisplay";
import {Box} from "@mui/material";
import {ProjectComponent} from "../components/ProjectComponent";

export type IndexPageProps = {
  midiInput: MidiInput
}

export const IndexPage: React.FC<IndexPageProps> = ({
  midiInput
}) => {

  const setProject = useSetAtom(projectAtom)

  React.useEffect(() => {
    return midiInput.on('sysex', sysex => {
      const msg = parseAbletonUIMessage(sysex.data)
      console.log('msg', msg)
      if(msg.type === 'init') {
        setProject(project =>
          addTrackToProject(
            project,
            fromUIMessage(msg.track)
          )
        )
      }
    })
  }, [setProject, midiInput])

  return (
    <Box>
      <ProjectComponent />
    </Box>
  )
}
