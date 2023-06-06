import React from 'react'
import {useAtomValue} from "jotai";
import {beatsAtom} from "../model/RealTime";
import {Box, Typography} from "@mui/material";

export type BeatCounterComponentProps = {}

export const BeatCounterComponent: React.FC<BeatCounterComponentProps> = ({}) => {

  const beat = useAtomValue(beatsAtom)

  return (
    <Box
      sx={{
        height: 100,
        width: '100%'
      }}
    >
      <Typography variant="h1" align='center'>
        {beat}
      </Typography>
    </Box>
  )
}
