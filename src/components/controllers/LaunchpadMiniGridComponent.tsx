import React from 'react'
import { Box } from '@mui/material'
import { useMidiOutput } from '../../hooks/Midi'

export type LaunchpadMiniGridComponentProps = {}

const midiCCFromRowCol = (row: number, column: number): number => parseInt(`${9 - row}${column + 1}`)

export const LaunchpadMiniGridComponent: React.FC<LaunchpadMiniGridComponentProps> = ({}) => {
  const buttonSize = 75
  const rows = 9
  const columns = 9

  const midiOutput = useMidiOutput()

  const onClick = (row: number, column: number) => {
    const cc = midiCCFromRowCol(row, column)
    console.log('clicked', cc)
    if (midiOutput !== undefined) {
      midiOutput.send({
        channel: 1,
        type: 'noteon',
        note: cc,
        velocity: 5,
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
      }}>
      {new Array(rows).fill(0).map((_, row) => (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'row',
          }}
          key={row}>
          {new Array(columns).fill(0).map((_, column) => (
            <Box
              sx={{
                width: `${buttonSize}px`,
                height: `${buttonSize}px`,
                border: '1px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => onClick(row, column)}
              key={column}>
              <Box>{midiCCFromRowCol(row, column)}</Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
