import React from 'react'
import {
  getHexColor,
  NavigateableClip,
  UIRealClip,
  UITrack
} from "../model/UIStateDisplay";
import {useActiveClip} from "../hooks/ActiveClipHook";
import {Box, Typography} from "@mui/material";
import {useMidiOutput} from "../hooks/Midi";
import {TX_MESSAGE} from "../model/AbletonUIMessage";
import {beatsAtom} from "../model/RealTime";
import {useAtomValue} from "jotai";
import _ from 'lodash'
import {Project} from "../model/Projects";

export type ClipNavComponentProps = {
  project: Project,
  track: UITrack,
}

export const ClipNavComponent: React.FC<ClipNavComponentProps> = ({
  project,
  track
}) => {

  const midiOutput = useMidiOutput()
  const activeClip = useActiveClip(track)
  const currentBeat = useAtomValue(beatsAtom)
  const arrangement = useAtomValue(project.arrangementAtom)

  const cueHash = React.useMemo(() => {
    return _.fromPairs(_.map(arrangement.cues, cue => [cue.time, cue]))
  }, [arrangement.cues])

  const clips = React.useMemo(() => {

    const tmpClips: Array<NavigateableClip> = []
    track.clips.forEach(clip => {
      if (clip.type === 'real') {
        const cue = _.get(cueHash, clip.startTime, undefined)
        if(cue !== undefined) {
          tmpClips.push({clip, cue})
        }
      }
    })
    return tmpClips
  }, [track, cueHash])

  const onClick = (clip: NavigateableClip) => {
    if(midiOutput !== undefined) {
      midiOutput.send(TX_MESSAGE.jumpToCue(clip.cue.index))
    }
  }

  return (
    <Box
      sx={{
        height: 100,
        display: 'flex'
      }}
    >
      {clips.map((navClip, clipIndex) => (
        <Box
          key={`section-track-${track.name}-clip-${clipIndex}`}
          sx={{
            display: 'flex',
            '&:hover': {
              border: '1px solid white',
              cursor: 'pointer'
            },
            border:
              navClip.clip === activeClip ? '2px solid white': `2px solid transparent`,
            width: 100,
            backgroundColor: getHexColor(navClip.clip),
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => onClick(navClip)}
        >
          <Typography align='center'>
            {navClip.clip.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
