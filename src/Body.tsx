import React from 'react'
import {Box, Divider, Typography} from "@mui/material";
import {ProjectComponent} from "./components/ProjectComponent";
import {ProjectComponent as ReduxTrackComponent} from "./components/redux/ProjectComponent";
import {ProjectComponent as JotaiTrackComponent} from "./components/jotai/ProjectComponent";
import {ProjectComponent as ZustandTrackComponent} from "./components/zustand/ProjectComponent";
import {MidiInput} from "./midi/WindowMidi";
import {byteArrayToJson} from "./utils/Converters";

const INACTIVE_COLOR = "777777"
const INACTIVE_CLIP_NAME = 'Inactive'

export type BodyProps = {
  midiInput: MidiInput
}

export const Body: React.FC<BodyProps> = ({
  midiInput
}) => {

  const [activeClip, setActiveClip] = React.useState(INACTIVE_CLIP_NAME)
  const [activeColor, setActiveColor] = React.useState(INACTIVE_COLOR)

  React.useEffect(() => {
    midiInput.on('sysex', sysex => {
      const json = byteArrayToJson(sysex.data)
      if(json.status === 'active') {
        setActiveClip(json.clip.name)
        setActiveColor(json.clip.color.toString(16))
      } else {
        setActiveClip(INACTIVE_CLIP_NAME)
        setActiveColor(INACTIVE_COLOR)
      }
    })
  }, [])

  return (
    <Box>
      <Box></Box>
      <Box sx={{bgcolor: `#${activeColor}`}}>
        <Typography variant="h1" align='center'>
          {activeClip}
        </Typography>
      </Box>
      <Box></Box>
    </Box>
  )
}