import React from 'react'
import {Box} from "@mui/material";
import {StepComponent} from "./StepComponent";
import {useProjectStore} from "../../model/ZustandStore";

export type StepsComponentProps = {
  trackIndex: number
}

export const StepsComponent: React.FC<StepsComponentProps> = ({trackIndex}) => {

  const steps = useProjectStore(s => s.tracks[trackIndex].steps)

  return (
    <Box>
      {steps.map((step, index) => (
        <StepComponent key={`step-${index}`} trackIndex={trackIndex} stepIndex={index} />
      ))}
    </Box>
  )
}