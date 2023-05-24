import React from 'react'
import {Box, Divider, Paper} from "@mui/material";
import {useTracks} from "../../model/ApplicationStore";
import {TrackComponent} from "./TrackComponent";

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = () => {

  const tracks = useTracks()

  return (
    <Box>
      <Paper sx={{p: 2}}>
        {tracks.map((track, i) => (
          <TrackComponent key={`track-${i}`} trackIndex={i}/>
        ))}
        <Divider />
      </Paper>
    </Box>
  )
}