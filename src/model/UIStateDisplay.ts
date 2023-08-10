import {atomWithStorage, splitAtom} from "jotai/utils";
import {
  InitClipMessage, InitCueMessage,
  InitProjectMessage,
  InitTrackMessage
} from "./AbletonUIMessage";
import _ from 'lodash'
import {produce} from "immer"
import {focusAtom} from "jotai-optics";
import {atom, PrimitiveAtom} from "jotai";

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

export type UIProject = {
  tracks: Array<UITrack>,
  cues: Array<UICue>
}

export const emptyProject = (): UIProject => ({
  tracks: [],
  cues: []
})

export type InitProject = Array<InitTrackMessage | InitClipMessage | InitCueMessage>

export const initProjectAtom = atom<InitProject>([])

export const projectAtom = atomWithStorage('project', emptyProject())

export const tracksAtom = focusAtom(projectAtom, o => o.prop('tracks'))

export const tracksAtoms = splitAtom(tracksAtom)

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

export const buildProject = (initProject: InitProject): UIProject => {

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

export const initProject = (message: InitProjectMessage): (p: InitProject) => InitProject => {
  return () => {
    return []
  }
}

export const initTrack = (message: InitTrackMessage): (p: InitProject) => InitProject => {
  return produce<InitProject>(project => {
    project.push(message)
  })
}

export const initClip = (message: InitClipMessage): (p: InitProject) => InitProject => {
  return produce<InitProject>(project => {
    project.push(message)
  })
}

export const initCue = (message: InitCueMessage): (p: InitProject) => InitProject => {
  return produce<InitProject>(project => {
    project.push(message)
  })
}

export const initDone = (initProject: InitProject): UIProject => {
  return buildProject(initProject)
}

export const getHexColor = (hasColor: {color: number}): string =>
  `#${hasColor.color.toString(16)}`