import React from 'react'
import {useAtomValue} from "jotai";
import {barBeatsAtom, timeSignatureAtom} from "../model/RealTime";
import {Box} from "@mui/material";
import _ from 'lodash'

const beatOneColor = 'red'
const beatOtherColor = 'green'
const noBeatColor = '#777777'

export type BarBeatComponentProps = {}

export const BarBeatComponent: React.FC<BarBeatComponentProps> = ({}) => {

  const barBeat = useAtomValue(barBeatsAtom)
  const timeSignature = useAtomValue(timeSignatureAtom)

  const sizeArr = React.useMemo(() => {
    return Array.from({length: timeSignature.noteCount}, (v, i) => i + 1)
  }, [timeSignature])

  return (
    <Box sx={{
      display: 'flex'
    }}>
      {_.map(sizeArr, index => (
        <Box
          sx={{
            border: '1px solid black',
            height: 100,
            width: 100,
            backgroundColor: barBeat === index ? (barBeat === 1 ? beatOneColor: beatOtherColor): noBeatColor
          }}
          key={`bar-beat-${index}`}
        >

        </Box>
      ))}
    </Box>
  )
}
