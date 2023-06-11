import React from 'react'
import {useAtomValue} from "jotai";
import {tempoAtom} from "../model/RealTime";
import {Box, Typography} from "@mui/material";

export type TempoComponentProps = {}

export const TempoComponent: React.FC<TempoComponentProps> = ({}) => {

  const tempo = useAtomValue(tempoAtom)

  return (
    <Box
      sx={{
        height: 100,
        width: '100%'
      }}
    >
      <Typography variant="h1" align='center'>
        {tempo}
      </Typography>
    </Box>
  )
}
