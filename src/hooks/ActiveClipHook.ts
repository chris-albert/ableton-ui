import React from 'react'
import { UIClip, UITrack } from '../model/UIStateDisplay'
import _ from 'lodash'
import { useBeat } from './RealTimeHooks'

const isClipActive = (clip: UIClip, beat: number): boolean => {
  return beat >= clip.startTime && (clip.endTime === undefined || beat < clip.endTime)
}

const searchActiveClip = (clips: Array<UIClip>, beat: number): UIClip => {
  return _.find(clips, (clip) => isClipActive(clip, beat)) as UIClip
}

export const useActiveClip = (track: UITrack): UIClip | undefined => {
  const beat = useBeat()

  return React.useMemo(() => searchActiveClip(track.clips, beat), [beat])
}
