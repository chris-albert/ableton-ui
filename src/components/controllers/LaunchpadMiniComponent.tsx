import React from 'react'
import { Option } from 'effect'
import { Box, Button } from '@mui/material'
import { useMidiInput, useMidiOutput } from '../../hooks/Midi'
import { ControllerGridComponent } from './ControllerGridComponent'
import { LaunchPadMiniMk3 } from '../../model/controllers/LaunchPadMiniMk3'

export type LaunchpadMiniComponentProps = {}

export const LaunchpadMiniComponent: React.FC<LaunchpadMiniComponentProps> = ({}) => {
  const controller = LaunchPadMiniMk3
  const midiOutput = useMidiOutput()
  const midiInput = useMidiInput()

  React.useEffect(() => {
    if (midiInput !== undefined && midiOutput !== undefined) {
      midiInput.on('*', (message) => {
        Option.map(controller.find(message), (pad) => {
          console.log('pad', pad)
          midiOutput.send(pad.message(5))
        })
      })
    }
  }, [midiInput])

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

  const clearPads = () => {
    if (midiOutput !== undefined) {
      controller.foreach((pad) => midiOutput.send(pad.message(0)))
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
        <Button
          sx={{ ml: 2 }}
          onClick={clearPads}
          variant='outlined'>
          Clear Pads
        </Button>
      </Box>
      <Box>
        <ControllerGridComponent controller={controller} />
      </Box>
    </Box>
  )
}
