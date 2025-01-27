import React from 'react'
import { MidiTarget } from '../../../midi/MidiTarget'
import { ProjectHooks } from '../../../hooks/ProjectHooks'
import { useActiveClip } from '../../../hooks/ActiveClipHook'
import _ from 'lodash'
import { NavigateableClip } from '../../../model/UIStateDisplay'
import { TX_MESSAGE } from '../../../model/AbletonUIMessage'
import { Midi } from '../../../midi/GlobalMidi'

type SongsWidgetProps = {
  targets: Array<MidiTarget>
  trackName: string
}

export const SongsWidget: React.FC<SongsWidgetProps> = ({ targets, trackName }) => {
  const dawEmitter = Midi.useDawEmitter()
  const arrangement = ProjectHooks.useArrangement()
  const track = ProjectHooks.useTrack(trackName)
  const activeClip = useActiveClip(track)

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
    dawEmitter.send(TX_MESSAGE.jumpToCue(clip.cue.index))
  }

  return <></>
}
