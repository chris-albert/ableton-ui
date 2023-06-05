import React from 'react'
import {Box} from "@mui/material";
import {useAtomValue} from "jotai";
import {tracksAtoms} from "../model/UIStateDisplay";
import {TrackComponent} from "./TrackComponent";

export type ProjectComponentProps = {}

export const ProjectComponent: React.FC<ProjectComponentProps> = ({

}) => {

  const tracks = useAtomValue(tracksAtoms)

  return (
    <Box>
      {tracks.map((trackAtom, i) => (
        <Box key={`tracks-${i}`}>
          <TrackComponent trackAtom={trackAtom} />
        </Box>
      ))}
    </Box>
  )
}
