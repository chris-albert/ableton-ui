import React from 'react'
import {getHexColor, UIClip, UITrack} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";
import {Box, Typography} from "@mui/material";

const INACTIVE_COLOR = "#777777"

export type SectionsTrackClipComponentProps = {
  track: UITrack
}

export const SectionsTrackClipComponent: React.FC<SectionsTrackClipComponentProps> = ({
  track
}) => {

  const activeClip = useActiveClip(track)

  const visibleClips = React.useMemo(() => {

    if(activeClip === undefined) {
      return track.clips
    } else {
      const tmpClips: Array<UIClip> = []
      track.clips.forEach(clip => {
        if (clip.startTime >= activeClip.startTime) {
          tmpClips.push(clip)
        }
      })
      return tmpClips
    }
  }, [activeClip, track])

  return (
    <Box
      sx={{
        height: 100,
        display: 'flex'
      }}
    >
      {visibleClips.map((clip, clipIndex) => (
        <Box
          key={`section-track-${track.name}-clip-${clipIndex}`}
          sx={{
            border:
              clip === activeClip ? '2px solid white': '2px solid transparent',
            width: 100,
            backgroundColor: clip.type === 'real' ? getHexColor(clip) : INACTIVE_COLOR
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
