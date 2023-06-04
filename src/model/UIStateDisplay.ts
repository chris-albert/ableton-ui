import {atomWithStorage} from "jotai/utils";
import {Track} from "./AbletonUIMessage";
import _ from 'lodash'
import {produce} from "immer"

export type UIClip = {
  name: string
  color: number
  startTime: number
  endTime: number | undefined
}

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

export const fromUIMessage = (track: Track): UITrack => {
  return {
    name: track.name,
    color: track.color,
    clips: track.clips.map(clip => ({
      name: clip.name,
      color: clip.color,
      startTime: clip.startTime,
      endTime: clip.endTime
    })),
    activeClipIndex: undefined
  }
}

export const addTrackToProject = (project: UIProject, track: UITrack): UIProject => {
  return produce<UIProject>(project => {
    const trackIndex = _.findIndex(project.tracks, t => t.name === track.name)
    if(trackIndex === -1) {
      project.tracks.push(track)
    } else {
      project.tracks[trackIndex] = track
    }
  })(project)
}

export const getHexColor = (hasColor: {color: number}): string =>
  `#${hasColor.color.toString(16)}`