import React from 'react'
import {Box, Slider, Typography} from "@mui/material";
import {KnobWidget} from "../../model/Widgets";

export type KnobWidgetComponentProps = {
  widget: KnobWidget
}

export const KnobWidgetComponent: React.FC<KnobWidgetComponentProps> = ({
  widget
}) => {

  const [value, setValue] = React.useState(0)

  return (
    <Box
      sx={{
        height: 100,
        width: 100,
        backgroundColor: widget.color,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Typography sx={{fontWeight: 'bold'}}>
          {widget.content || ""}
        </Typography>
      </Box>
      <Box sx={{mx: 1}}>
        <Slider
          value={value}
          onChange={(e, v) => setValue(v as number)}
          aria-label="Disabled slider" />
      </Box>
    </Box>
  )
}
