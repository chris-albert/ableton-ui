import {atomWithStorage, splitAtom} from "jotai/utils";
import {
  InitClipMessage, InitCueMessage,
  InitProjectMessage,
  InitTrackMessage
} from "./AbletonUIMessage";
import _ from 'lodash'
import {produce} from "immer"
import {focusAtom} from "jotai-optics";
import {atom, PrimitiveAtom, useAtomValue} from "jotai";
import {Project} from "./Projects";
import React from "react";

export type UIRealClip = {
  type: 'real'
  name: string
  color: number
  startTime: number
  endTime: number
}

export type UIBlankClip = {
  type: 'blank'
  startTime: number
  endTime: number | undefined
}

export type UIClip = UIRealClip | UIBlankClip

export type UITrack = {
  name: string
  color: number
  clips: Array<UIClip>
}

export type UICue = {
  id: number
  name: string
  time: number
  index: number
}

export type NavigateableClip = {
  clip: UIRealClip,
  cue: UICue
}

export type UIArrangement = {
  tracks: Array<UITrack>,
  cues: Array<UICue>
}

export const emptyArrangement = (): UIArrangement => ({
  tracks: [],
  cues: []
})

export type InitArrangement = Array<InitTrackMessage | InitClipMessage | InitCueMessage>

export const initProjectAtom = atom<InitArrangement>([])

export const useTracks = (project: Project) =>
  useAtomValue(React.useMemo(() => tracksAtom(project.arrangementAtom), [project.arrangementAtom]))

export const useTracksAtoms = (project: Project) =>
  useAtomValue(React.useMemo(() => tracksAtoms(project.arrangementAtom), [project.arrangementAtom]))

export const tracksAtom = (arrangementAtom: PrimitiveAtom<UIArrangement>) => focusAtom(arrangementAtom, o => o.prop('tracks'))

export const tracksAtoms = (arrangementAtom: PrimitiveAtom<UIArrangement>) => splitAtom(tracksAtom(arrangementAtom))

export const clipsAtom = (trackAtom: PrimitiveAtom<UITrack>) =>
  focusAtom(trackAtom, o => o.prop('clips'))

const buildContiguousClips = (clips: Array<InitClipMessage>): Array<UIClip> => {

  let lastEndTime = 0
  const uiClips: Array<UIClip> = []
  _.forEach(clips, clip => {
    if(lastEndTime !== clip.startTime) {
      uiClips.push({
        type: 'blank',
        startTime: lastEndTime,
        endTime: clip.startTime,
      })
    }

    uiClips.push({...clip, type: 'real'})
    lastEndTime = clip.endTime
  })
  uiClips.push({
    type: 'blank',
    startTime: lastEndTime,
    endTime: undefined,
  })

  return uiClips
}

export const buildArrangement = (initProject: InitArrangement): UIArrangement => {

  const tracksMessages: Array<InitTrackMessage> = []
  const clipsMessages: Array<InitClipMessage> = []
  const cueMessages: Array<InitCueMessage> = []
  _.forEach(initProject, message => {
    if(message.type === 'init-track') {
      tracksMessages.push(message)
    } else if(message.type === 'init-clip'){
      clipsMessages.push(message)
    } else {
      cueMessages.push(message)
    }
  })

  const orderedTracks = _.sortBy(tracksMessages, t => t.trackIndex)
  const groupedClips = _.groupBy(clipsMessages, c => c.trackIndex)

  return {
    tracks: _.map(orderedTracks, track => {
      const trackClips = _.get(groupedClips, track.trackIndex)
      return {
        name: track.name,
        color: track.color,
        clips: buildContiguousClips(trackClips)
      }
    }),
    cues: cueMessages
  }
}

export const initArrangement = (message: InitProjectMessage): (p: InitArrangement) => InitArrangement => {
  return () => {
    return []
  }
}

export const initTrack = (message: InitTrackMessage): (p: InitArrangement) => InitArrangement => {
  return produce<InitArrangement>(arrangement => {
    arrangement.push(message)
  })
}

export const initClip = (message: InitClipMessage): (p: InitArrangement) => InitArrangement => {
  return produce<InitArrangement>(arrangement => {
    arrangement.push(message)
  })
}

export const initCue = (message: InitCueMessage): (p: InitArrangement) => InitArrangement => {
  return produce<InitArrangement>(arrangement => {
    arrangement.push(message)
  })
}

export const initDone = (initArrangement: InitArrangement): UIArrangement => {
  return buildArrangement(initArrangement)
}

export const getHexColor = (hasColor: {color: number}): string =>
  `#${hasColor.color.toString(16)}`