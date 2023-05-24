import React from 'react'
import {Box} from "@mui/material";
import {useTrack} from "../../model/ApplicationStore";
import {StepsComponent} from "./StepsComponent";

export type TrackComponentProps = {
  trackIndex: number
}

export const TrackComponent: React.FC<TrackComponentProps> = ({trackIndex}) => {

  const track = useTrack(trackIndex)

  return (
    <Box sx={{mb: '4px'}}>
      <StepsComponent trackIndex={trackIndex} />
    </Box>
  )
}