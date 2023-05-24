import create from 'zustand'
import {emptyProject, Project} from "./Project";
import produce from "immer"

type ProjectActions = {
  newTrack: () => void,
  stepToggle: (t: number, s: number) => void
}

type ProjectState = ProjectActions & Project

export const useProjectStore = create<ProjectState>(set => ({
  ...emptyProject(),
  newTrack: () => {},
  stepToggle: (trackIndex: number, stepIndex: number) => {
    set(prevState => produce(prevState, draftState => {
      draftState.tracks[trackIndex].steps[stepIndex].on = !draftState.tracks[trackIndex].steps[stepIndex].on
    }))
  }
}))