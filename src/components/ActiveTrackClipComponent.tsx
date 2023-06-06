import React from 'react'
import {Box} from "@mui/material";
import {getHexColor, UITrack} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";

export type ActiveTrackClipComponentProps = {
  track: UITrack
}

export const ActiveTrackClipComponent: React.FC<ActiveTrackClipComponentProps> = ({
  track
}) => {

  const clip = useActiveClip(track)

  return (
    <Box
      sx={{
        '&:hover': {
          border: '1px solid white',
          cursor: 'pointer'
        },
        height: 100,
        width: '100%',
        backgroundColor: getHexColor(track)
      }}
    >
      {track.name}
    </Box>
  )
}
