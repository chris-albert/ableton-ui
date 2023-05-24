import React from 'react'
import {Box} from "@mui/material";
import {StepsComponent} from "./StepsComponent";
import {PrimitiveAtom} from "jotai";
import {Track} from "../../model/Project";
import {focusAtom} from "jotai/optics";

export type TrackComponentProps = {
  track: PrimitiveAtom<Track>
}

export const TrackComponent: React.FC<TrackComponentProps> = ({track}) => {

  const steps = focusAtom(track, o => o.prop('steps'))

  return (
    <Box sx={{mb: '4px'}}>
      <StepsComponent steps={steps} />
    </Box>
  )
}