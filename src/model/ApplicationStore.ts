import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {emptyProject, newTrack, Step} from "./Project";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const ProjectSlice = createSlice({
  name: 'project',
  initialState: emptyProject(),
  reducers: {
    newTrack: state => {
      state.tracks.push(newTrack(8))
    },
    stepToggle: (state, action: PayloadAction<[number, number]>) => {
      const [trackIndex, stepIndex] = action.payload
      state.tracks[trackIndex].steps[stepIndex].on = !state.tracks[trackIndex].steps[stepIndex].on
    }
  }
})

export const ApplicationStore = configureStore({
  reducer: {
    project: ProjectSlice.reducer
  },
})

export type ApplicationState = ReturnType<typeof ApplicationStore.getState>
export type ApplicationDispatch = typeof ApplicationStore.dispatch

export const useAppDispatch: () => ApplicationDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector

export const useTracks = () =>
  useAppSelector(s => s.project.tracks)

export const useTrack = (index: number) =>
  useAppSelector(s => s.project.tracks[index])

export const useStep = (trackIndex: number, stepIndex: number) =>
  useAppSelector(s => s.project.tracks[trackIndex].steps[stepIndex])

