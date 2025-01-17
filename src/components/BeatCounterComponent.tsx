import React from 'react'
import { Box, Typography } from '@mui/material'
import { useBeat } from '../hooks/RealTimeHooks'

export type BeatCounterComponentProps = {}

export const BeatCounterComponent: React.FC<BeatCounterComponentProps> = ({}) => {
  const beat = useBeat()

  return (
    <Box
      sx={{
        height: 100,
        width: '100%',
      }}>
      <Typography
        variant='h1'
        align='center'>
        {beat}
      </Typography>
    </Box>
  )
}
