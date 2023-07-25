import React from 'react'
import {Box} from "@mui/material";
import {PlayButtonComponent} from "../PlayButtonComponent";
import {StopButtonComponent} from "../StopButtonComponent";
import {useAtomValue} from "jotai";
import {isPlayingAtom} from "../../model/RealTime";
import {useMidiOutput} from "../../hooks/Midi";
import {generateRawSysex, TX_MESSAGE} from "../../model/AbletonUIMessage";

export type PlayStopWidgetComponentProps = {}

export const PlayStopWidgetComponent: React.FC<PlayStopWidgetComponentProps> = ({}) => {

  const isPlaying = useAtomValue(isPlayingAtom)

  const midiOutput = useMidiOutput()

  const onClick = (isPlaying: boolean) => {
    if(midiOutput !== undefined) {
      if(isPlaying) {
        midiOutput.send(TX_MESSAGE.stop())
      } else {
        midiOutput.send(TX_MESSAGE.play())
      }
    }
  }

  return (
    <Box
      sx={{
        height: 100,
        width: '100%'
      }}
    >
      {isPlaying ?
        (<StopButtonComponent
          onStop={() => onClick(false)}
        />) :
        (<PlayButtonComponent
          onPlay={() => onClick(true)}
        />)
      }
    </Box>
  )
}
