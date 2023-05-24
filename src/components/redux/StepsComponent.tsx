import React from 'react'
import {useTrack} from "../../model/ApplicationStore";
import {Box} from "@mui/material";
import {StepComponent} from "./StepComponent";

export type StepsComponentProps = {
  trackIndex: number
}

export const StepsComponent: React.FC<StepsComponentProps> = ({trackIndex}) => {

  const track = useTrack(trackIndex)
  return (
    <Box>
      {track.steps.map((step, i) => (
        <StepComponent key={`step-${i}`} trackIndex={trackIndex} stepIndex={i} />
      ))}
    </Box>
  )
}