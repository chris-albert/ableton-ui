import React from 'react'
import {getHexColor, UIClip, UITrack} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";
import {Box, Typography} from "@mui/material";
import _ from 'lodash'
const INACTIVE_COLOR = "#777777"

export type SectionsTrackClipComponentProps = {
  track: UITrack,
  size: number
}

export const SectionsTrackClipComponent: React.FC<SectionsTrackClipComponentProps> = ({
  track,
  size
}) => {

  const activeClip = useActiveClip(track)

  const visibleClips = React.useMemo(() => {

    if(activeClip === undefined) {
      return _.take(track.clips, size)
    } else {
      const tmpClips: Array<UIClip> = []
      track.clips.forEach(clip => {
        if (clip.startTime >= activeClip.startTime) {
          tmpClips.push(clip)
        }
      })
      return _.take(tmpClips, size)
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
              clip === activeClip ? '2px solid white': `2px solid ${INACTIVE_COLOR}`,
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
