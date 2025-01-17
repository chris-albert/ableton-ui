import React from 'react'
import { Box, Button } from '@mui/material'
import { ControllerGridComponent } from './ControllerGridComponent'
import { LaunchPadMiniMk3 } from '../../model/controllers/LaunchPadMiniMk3'
import { MyCustomBindings } from '../../model/controllers/MyCustomBindings'
import { Midi } from '../../midi/GlobalMidi'

export type LaunchpadMiniComponentProps = {}

export const LaunchpadMiniComponent: React.FC<LaunchpadMiniComponentProps> = ({}) => {
  const controller = LaunchPadMiniMk3
  const bindings = MyCustomBindings

  React.useEffect(() => {
    bindings.bind()
  }, [])

  const enableProgrammerMode = () => {
    Midi.emitters.controller.send({
      type: 'sysex',
      manufacturer: 0,
      statusByte: 32,
      body: [41, 2, 13, 14, 1],
    })
  }

  const clearPads = () => {
    controller.foreach((pad) => Midi.emitters.controller.send(pad.message(0)))
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
        <ControllerGridComponent controller={controller} />
      </Box>
    </Box>
  )
}
