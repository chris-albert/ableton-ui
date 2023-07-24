import React from 'react'
import {Box} from "@mui/material";
import {PlayButtonComponent} from "../PlayButtonComponent";
import {StopButtonComponent} from "../StopButtonComponent";
import {useAtomValue, useSetAtom} from "jotai";
import {isPlayingAtom} from "../../model/RealTime";

export type PlayStopWidgetComponentProps = {}

export const PlayStopWidgetComponent: React.FC<PlayStopWidgetComponentProps> = ({}) => {

  const isPlaying = useAtomValue(isPlayingAtom)

  return (
    <Box
      sx={{
        height: 100,
        width: '100%'
      }}
    >
      {isPlaying ?
        (<StopButtonComponent
          onStop={() => {}}
        />) :
        (<PlayButtonComponent
          onPlay={() => {}}
        />)
      }
    </Box>
  )
}
