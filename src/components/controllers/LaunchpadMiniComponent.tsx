import React from 'react'
import { Box, Button } from '@mui/material'
import { ControllerGridComponent } from './ControllerGridComponent'
import { ControllerMidi } from '../../midi/ControllerMidi'

export type LaunchpadMiniComponentProps = {}

export const LaunchpadMiniComponent: React.FC<LaunchpadMiniComponentProps> = ({}) => {
  const bindings = ControllerMidi.getBindings()

  const enableProgrammerMode = () => {
    bindings.controller.init()
  }

  const clearPads = () => {
    bindings.controller.clear()
  }

  const reBind = () => {
    bindings.bind()
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
        <Button
          sx={{ ml: 2 }}
          onClick={reBind}
          variant='outlined'>
          Re-Bind
        </Button>
      </Box>
      <Box>
        <ControllerGridComponent controller={bindings.controller} />
      </Box>
    </Box>
  )
}
