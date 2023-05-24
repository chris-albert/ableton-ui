import React from 'react'
import {Box} from "@mui/material";
import {StepComponent} from "./StepComponent";
import {PrimitiveAtom, useAtom} from "jotai";
import {Step} from "../../model/Project";
import {splitAtom} from "jotai/utils";

export type StepsComponentProps = {
  steps: PrimitiveAtom<Array<Step>>
}

export const StepsComponent: React.FC<StepsComponentProps> = ({steps}) => {

  const [stepAtoms] = useAtom(splitAtom(steps))

  return (
    <Box>
      {stepAtoms.map((step, index) => (
        <StepComponent key={`${step}`} step={step} index={index} />
      ))}
    </Box>
  )
}