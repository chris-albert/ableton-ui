import React from 'react'
import {Box, Button} from "@mui/material";
import {ProjectSlice, useAppDispatch, useStep} from "../../model/ApplicationStore";

export type StepComponentProps = {
  trackIndex: number
  stepIndex: number
}

export const StepComponent: React.FC<StepComponentProps> = ({trackIndex, stepIndex}) => {

  const step = useStep(trackIndex, stepIndex)
  const dispatch = useAppDispatch()

  return (
    <Box component="span" sx={{mx: '2px'}}>
      <Button
        sx={{px: '0'}}
        variant={step.on ? 'contained': 'outlined'}
        onClick={() => {
          // state.set(b => !b)
          dispatch(ProjectSlice.actions.stepToggle([trackIndex, stepIndex]))
        }}
      >
        {stepIndex + 1}
      </Button>
    </Box>
  )
}