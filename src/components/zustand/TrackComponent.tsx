import React from 'react'
import {Box} from "@mui/material";
import {StepsComponent} from "./StepsComponent";
import {PrimitiveAtom, useAtom} from "jotai";
import {Track} from "../../model/Project";
import {focusAtom} from "jotai/optics";
import {splitAtom} from "jotai/utils";
import {useProjectStore} from "../../model/ZustandStore";

export type TrackComponentProps = {
  trackIndex: number
}

export const TrackComponent: React.FC<TrackComponentProps> = ({trackIndex}) => {

  return (
    <Box sx={{mb: '4px'}}>
      <StepsComponent trackIndex={trackIndex} />
    </Box>
  )
}