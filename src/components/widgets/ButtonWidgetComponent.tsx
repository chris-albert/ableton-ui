import React from 'react'
import {ButtonWidget} from "../../model/Widgets";
import {Box, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useMidiOutput} from "../../hooks/Midi";

export type ButtonWidgetComponentProps = {
  widget: ButtonWidget
}

export const ButtonWidgetComponent: React.FC<ButtonWidgetComponentProps> = ({
  widget
}) => {

  const midiOutput = useMidiOutput()

  const onClick = () => {
    if(midiOutput !== undefined) {
      console.log("sending midi messagegs")
      widget.midi.forEach(midiOutput.send)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100,
      backgroundColor: widget.color
    }}>
      <IconButton
        onClick={onClick}
      >
        <Typography sx={{fontSize: widget.fontSize}}>
          {widget.content || ''}
        </Typography>
      </IconButton>

    </Box>
  )
}
