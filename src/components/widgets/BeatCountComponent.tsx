import React from 'react'
import {useAtomValue} from "jotai";
import {barBeatsAtom} from "../../model/RealTime";
import {Box, Typography} from "@mui/material";

export type BeatCountComponentProps = {}

export const BeatCountComponent: React.FC<BeatCountComponentProps> = ({}) => {

  const barBeat = useAtomValue(barBeatsAtom)

  return (
    <Box
      sx={{
        height: 100,
        width: '100%'
      }}
    >
      <Typography variant="h1" align='center'>
        {barBeat}
      </Typography>
    </Box>
  )
}
