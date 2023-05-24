import React from 'react'
import {Box, Button} from "@mui/material";
import {PrimitiveAtom, useAtom} from "jotai";
import {Step} from "../../model/Project";
import {useStepOnFocus} from "../../model/Atoms";
import {useProjectStore} from "../../model/ZustandStore";

export type StepComponentProps = {
  trackIndex: number
  stepIndex: number
}

export const StepComponent: React.FC<StepComponentProps> = ({trackIndex, stepIndex}) => {

  const toggle = useProjectStore(s => s.stepToggle)
  const on = useProjectStore(s => s.tracks[trackIndex].steps[stepIndex].on)

  return (
    <Box component="span" sx={{mx: '2px'}}>
      <Button
        sx={{px: '0'}}
        variant={on ? 'contained': 'outlined'}
        onClick={() => {
          // setOn(b => !b)
          toggle(trackIndex, stepIndex)
        }}
      >
        {stepIndex + 1}
      </Button>
    </Box>
  )
}