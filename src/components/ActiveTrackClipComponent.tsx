import React from 'react'
import {Box, Typography} from "@mui/material";
import {getHexColor, UITrack} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";
const INACTIVE_COLOR = "#777777"
const INACTIVE_CLIP_NAME = ''

export type ActiveTrackClipComponentProps = {
  track: UITrack
}

export const ActiveTrackClipComponent: React.FC<ActiveTrackClipComponentProps> = ({
  track
}) => {

  const clip = useActiveClip(track)

  const activeColor = React.useMemo(() => {
    if(clip !== undefined && clip.type === 'real') {
      return getHexColor(clip)
    } else {
      return INACTIVE_COLOR
    }
  }, [clip])

  const activeClipName = React.useMemo(() => {
    if(clip !== undefined && clip.type === 'real') {
      return clip.name
    } else {
      return INACTIVE_CLIP_NAME
    }
  }, [clip])

  return (
    <Box
      sx={{
        '&:hover': {
          border: '1px solid white',
          cursor: 'pointer'
        },
        height: 100,
        width: '100%',
        backgroundColor: `${activeColor}`
      }}
    >
      <Typography variant="h1" align='center'>
        {activeClipName}
      </Typography>
    </Box>
  )
}
