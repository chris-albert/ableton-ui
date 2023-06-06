import {atomWithStorage, splitAtom} from "jotai/utils";
import {Clip, Track} from "./AbletonUIMessage";
import _ from 'lodash'
import {produce} from "immer"
import {focusAtom} from "jotai-optics";
import {PrimitiveAtom} from "jotai";

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
  activeClipIndex: number | undefined
}

export type UIProject = {
  tracks: Array<UITrack>
}

export const emptyProject = (): UIProject => ({
  tracks: []
})

export const projectAtom = atomWithStorage('project', emptyProject())

export const tracksAtom = focusAtom(projectAtom, o => o.prop('tracks'))

export const tracksAtoms = splitAtom(tracksAtom)

export const clipsAtom = (trackAtom: PrimitiveAtom<UITrack>) =>
  focusAtom(trackAtom, o => o.prop('clips'))

const buildContiguousClips = (clips: Array<Clip>): Array<UIClip> => {

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

export const fromTracks = (tracks: Array<Track>): Array<UITrack> => {
  return _.map(tracks, track => ({
    name: track.name,
    color: track.color,
    clips: buildContiguousClips(track.clips),
    activeClipIndex: undefined
  }))
}

export const addTracksToProject = (project: UIProject, tracks: Array<Track>): UIProject => {
  return produce<UIProject>(project => {
    project.tracks = fromTracks(tracks)
  })(project)
}

export const getHexColor = (hasColor: {color: number}): string =>
  `#${hasColor.color.toString(16)}`