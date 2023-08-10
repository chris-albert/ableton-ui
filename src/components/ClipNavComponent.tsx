import React from 'react'
import {getHexColor, UIRealClip, UITrack} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";
import {Box, Typography} from "@mui/material";
import {useMidiOutput} from "../hooks/Midi";
import {TX_MESSAGE} from "../model/AbletonUIMessage";
import {beatsAtom} from "../model/RealTime";
import {useAtomValue} from "jotai";

export type ClipNavComponentProps = {
  track: UITrack,
}

export const ClipNavComponent: React.FC<ClipNavComponentProps> = ({
  track
}) => {

  const midiOutput = useMidiOutput()
  const activeClip = useActiveClip(track)
  const currentBeat = useAtomValue(beatsAtom)

  const clips = React.useMemo(() => {

    const tmpClips: Array<UIRealClip> = []
    track.clips.forEach(clip => {
      if (clip.type === 'real') {
        tmpClips.push(clip)
      }
    })
    return tmpClips
  }, [track])

  const onClick = (clip: UIRealClip) => {
    if(midiOutput !== undefined) {
      midiOutput.send(TX_MESSAGE.jumpTo(clip.startTime - currentBeat))
    }
  }

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
            backgroundColor: getHexColor(clip),
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => onClick(clip)}
        >
          <Typography align='center'>
            {clip.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
