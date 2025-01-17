import React from 'react'
import { getHexColor, NavigateableClip, UITrack } from '../model/UIStateDisplay'
import { useActiveClip } from '../hooks/ActiveClipHook'
import { Box, Typography } from '@mui/material'
import { TX_MESSAGE } from '../model/AbletonUIMessage'
import { useAtomValue } from 'jotai'
import _ from 'lodash'
import { Project } from '../model/Projects'
import { Midi } from '../midi/GlobalMidi'
import { useBeat } from '../hooks/RealTimeHooks'

export type ClipNavComponentProps = {
  project: Project
  track: UITrack
}

export const ClipNavComponent: React.FC<ClipNavComponentProps> = ({ project, track }) => {
  const activeClip = useActiveClip(track)
  const currentBeat = useBeat()
  const arrangement = useAtomValue(project.arrangementAtom)

  const cueHash = React.useMemo(() => {
    return _.fromPairs(_.map(arrangement.cues, (cue) => [cue.time, cue]))
  }, [arrangement.cues])

  const clips = React.useMemo(() => {
    const tmpClips: Array<NavigateableClip> = []
    track.clips.forEach((clip) => {
      if (clip.type === 'real') {
        const cue = _.get(cueHash, clip.startTime, undefined)
        if (cue !== undefined) {
          tmpClips.push({ clip, cue })
        }
      }
    })
    return tmpClips
  }, [track, cueHash])

  const onClick = (clip: NavigateableClip) => {
    Midi.emitters.daw.send(TX_MESSAGE.jumpToCue(clip.cue.index))
  }

  return (
    <Box
      sx={{
        height: 100,
        display: 'flex',
      }}>
      {clips.map((navClip, clipIndex) => (
        <Box
          key={`section-track-${track.name}-clip-${clipIndex}`}
          sx={{
            display: 'flex',
            '&:hover': {
              border: '1px solid white',
              cursor: 'pointer',
            },
            border: navClip.clip === activeClip ? '2px solid white' : `2px solid transparent`,
            width: 100,
            backgroundColor: getHexColor(navClip.clip),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => onClick(navClip)}>
          <Typography align='center'>{navClip.clip.name}</Typography>
        </Box>
      ))}
    </Box>
  )
}
