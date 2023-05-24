import React from 'react'
import {Box, Divider, Paper} from "@mui/material";
import {TrackComponent} from "./TrackComponent";
import {useProjectStore} from "../../model/ZustandStore";
import {emptyProject, Project, Track} from "../../model/Project";
import {EventState, eventState, eventStateArray, useEventState} from "../../model/EventState";

const projectEventState = eventState<Project>([])

const a: EventState<Array<Track>> = projectEventState.focus('tracks')

const b: Array<EventState<Track>> = eventStateArray<Track>(a)

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = () => {


  const tracks = useProjectStore(s => s.tracks)

  return (
    <Box>
      <Paper sx={{p: 2}}>
        {tracks.map((track, i) => (
          <TrackComponent key={`track-${i}`} trackIndex={i} />
        ))}
        <Divider />
      </Paper>
    </Box>
  )
}