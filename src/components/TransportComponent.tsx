import React from 'react'
import {Box, Chip, IconButton} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import {transportMachineAtom} from "../model/Atoms";
import {useAtom} from "jotai";
import {TransportStates} from "../model/Transport";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export type TransportComponentProps = {}

export const TransportComponent: React.FC<TransportComponentProps> = () => {

  const [transportState, sendTransport] = useAtom(transportMachineAtom)

  return (
    <Box>
      <Chip
        sx={{mr: 4}}
        label={transportState.context.bar}
        variant="outlined"
      />
      <IconButton
        size="small"
        sx={{border: 1}}
        disabled={transportState.matches(TransportStates.PLAYING)}
        onClick={() => {
          sendTransport({type: 'PLAY'})
        }}
      >
        <PlayArrowIcon fontSize="small"/>
      </IconButton>
      <IconButton
        size="small"
        sx={{border: 1}}
        disabled={transportState.matches(TransportStates.PAUSED) || transportState.matches(TransportStates.STOPPED)}
        onClick={() => {
          sendTransport({type: 'PAUSE'})
        }}
      >
        <PauseIcon fontSize="small"/>
      </IconButton>
      <IconButton
        size="small"
        sx={{border: 1}}
        disabled={transportState.matches(TransportStates.STOPPED) || transportState.matches(TransportStates.PAUSED)}
        onClick={() => {
          sendTransport({type: 'STOP'})
        }}
      >
        <StopIcon fontSize="small"/>
      </IconButton>

      <IconButton
        size="small"
        sx={{border: 1, ml: 4}}
        onClick={() => {
          sendTransport({type: 'NEXT'})
        }}
      >
        <NavigateNextIcon fontSize="small"/>
      </IconButton>
    </Box>
  )
}