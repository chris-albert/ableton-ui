import React from 'react'
import { Box, Button } from '@mui/material'
import { LaunchpadMiniGridComponent } from './LaunchpadMiniGridComponent'
import { useMidiOutput } from '../../hooks/Midi'

export type LaunchpadMiniComponentProps = {}

export const LaunchpadMiniComponent: React.FC<LaunchpadMiniComponentProps> = ({}) => {
  const midiOutput = useMidiOutput()

  const enableProgrammerMode = () => {
    if (midiOutput !== undefined) {
      midiOutput.send({
        type: 'sysex',
        manufacturer: 0,
        statusByte: 32,
        body: [41, 2, 13, 14, 1],
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        p: 2,
      }}>
      <Box>
        <Button
          onClick={enableProgrammerMode}
          variant='outlined'>
          Enable Programmer Mode
        </Button>
      </Box>
      <Box>
        <LaunchpadMiniGridComponent />
      </Box>
    </Box>
  )
}
