import React from 'react'
import {useAtomValue} from "jotai";
import {timeSignatureAtom} from "../model/RealTime";
import {Box, Typography} from "@mui/material";

export type TimeSignatureComponentProps = {}

export const TimeSignatureComponent: React.FC<TimeSignatureComponentProps> = ({}) => {

  const timeSignature = useAtomValue(timeSignatureAtom)

  return (
    <Box
      sx={{
        height: 100,
        width: '100%'
      }}
    >
      <Typography variant="h1" align='center'>
        {timeSignature.noteCount }/{timeSignature.noteLength}
      </Typography>
    </Box>
  )
}
