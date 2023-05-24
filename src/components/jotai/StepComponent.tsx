import React from 'react'
import {Box, Button} from "@mui/material";
import {PrimitiveAtom} from "jotai";
import {Step} from "../../model/Project";
import {useStepOnFocus} from "../../model/Atoms";

export type StepComponentProps = {
  step: PrimitiveAtom<Step>
  index: number
}

export const StepComponent: React.FC<StepComponentProps> = ({step, index}) => {

  const [on, setOn] = useStepOnFocus(step)

  return (
    <Box component="span" sx={{mx: '2px'}}>
      <Button
        sx={{px: '0'}}
        variant={on ? 'contained': 'outlined'}
        onClick={() => {
          setOn(b => !b)
        }}
      >
        {index + 1}
      </Button>
    </Box>
  )
}