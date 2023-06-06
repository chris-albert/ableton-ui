import React from 'react'
import {UIClip, UITrack} from "../model/UIStateDisplay";
import {useAtomValue} from "jotai";
import {beatsAtom} from "../model/RealTime";
import _ from 'lodash'

const isClipActive = (clip: UIClip, beat: number): boolean => {
  return beat >= clip.startTime &&
    (clip.endTime === undefined || beat <= clip.endTime)
}

const searchActiveClip = (clips: Array<UIClip>, beat: number): UIClip => {
  return _.find(clips, clip => isClipActive(clip, beat)) as UIClip
}

export const useActiveClip = (track: UITrack): UIClip | undefined => {

  const beat = useAtomValue(beatsAtom)

  return React.useMemo(() => searchActiveClip(track.clips, beat), [beat])
}