import React from 'react'
import {getHexColor, UIClip, UITrack} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";
import _ from "lodash";
import {Box, Typography} from "@mui/material";

export type ClipNavComponentProps = {
  track: UITrack,
}

export const ClipNavComponent: React.FC<ClipNavComponentProps> = ({
  track
}) => {

  const activeClip = useActiveClip(track)

  const clips = React.useMemo(() => {

    const tmpClips: Array<UIClip> = []
    track.clips.forEach(clip => {
      if (clip.type === 'real') {
        tmpClips.push(clip)
      }
    })
    return tmpClips
  }, [track])

  return (
    <Box
      sx={{
        height: 100,
        display: 'flex'
      }}
    >
      {clips.map((clip, clipIndex) => (
        <Box
          key={`section-track-${track.name}-clip-${clipIndex}`}
          sx={{
            display: 'flex',
            '&:hover': {
              border: '1px solid white',
              cursor: 'pointer'
            },
            border:
              clip === activeClip ? '2px solid white': `2px solid transparent`,
            width: 100,
            backgroundColor: clip.type === 'real' ? getHexColor(clip) : '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography align='center'>
            {clip.type === 'real' ? clip.name : ''}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
