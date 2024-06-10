import React from 'react'
import {Box} from "@mui/material";
import {TrackComponent} from "../TrackComponent";
import {ArrangementTimelineComponent} from "./ArrangementTimelineComponent";
import {Project} from "../../model/Projects";
import {useTracksAtoms} from "../../model/UIStateDisplay";

export type ArrangementComponentProps = {
  project: Project
}

export const ArrangementComponent: React.FC<ArrangementComponentProps> = ({
  project
}) => {

  const tracks = useTracksAtoms(project)

  return (
    <Box>
      <ArrangementTimelineComponent />
      {tracks.map((trackAtom, i) => (
        <Box key={`tracks-${i}`}>
          <TrackComponent trackAtom={trackAtom} />
        </Box>
      ))}
    </Box>
  )
}
