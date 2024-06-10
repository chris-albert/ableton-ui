import React from 'react'
import {useAtomValue} from "jotai";
import {tracksAtoms} from "../../model/UIStateDisplay";
import {Box} from "@mui/material";
import {TrackComponent} from "../TrackComponent";
import {ArrangementTimelineComponent} from "./ArrangementTimelineComponent";

export type ArrangementComponentProps = {}

export const ArrangementComponent: React.FC<ArrangementComponentProps> = ({}) => {

  const tracks = useAtomValue(tracksAtoms)

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
