import React from 'react'
import {Box, Divider, Paper} from "@mui/material";
import {TrackComponent} from "./TrackComponent";
import {tracksAtomsAtom} from "../../model/Atoms";
import {useAtom} from "jotai";

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = () => {

  const [tracks] = useAtom(tracksAtomsAtom)

  return (
    <Box>
      <Paper sx={{p: 2}}>
        {tracks.map(track => (
          <TrackComponent key={`${track}`} track={track} />
        ))}
        <Divider />
      </Paper>
    </Box>
  )
}