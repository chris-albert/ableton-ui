import React from 'react'
import {
  editWidgetsAtom,
  moveLeftWidget,
  moveRightWidget, PlayStopWidget,
  removeWidget,
  Widget,
  widgetsAtom
} from "../model/Widgets";
import {Box, Paper} from "@mui/material";
import {TempoComponent} from "./TempoComponent";
import {TimeSignatureComponent} from "./TimeSignatureComponent";
import {BeatCounterComponent} from "./BeatCounterComponent";
import {BarBeatComponent} from "./BarBeatComponent";
import {BeatCountComponent} from "./widgets/BeatCountComponent";
import {ActiveTrackClipWidgetComponent} from "./widgets/ActiveTrackClipWidgetComponent";
import {TrackSectionWidgetComponent} from "./widgets/TrackSectionWidgetComponent";
import {useAtomValue, useSetAtom} from "jotai";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeftOutlined';
import {PlayStopWidgetComponent} from "./widgets/PlayStopWidgetComponent";

export type WidgetComponentProps = {
  widget: Widget
}

export const WidgetComponent: React.FC<WidgetComponentProps> = ({
  widget
}) => {

  const isEdit = useAtomValue(editWidgetsAtom)
  const setWidgets = useSetAtom(widgetsAtom)

  let el = (
    <Box>Unknown</Box>
  )

  if(widget.type === 'tempo') {
    el = (<TempoComponent />)
  } else if(widget.type === 'time-signature') {
    el = (<TimeSignatureComponent />)
  } else if(widget.type === 'beat-counter') {
    el = (<BeatCounterComponent />)
  } else if(widget.type === 'bar-beat') {
    el = (<BarBeatComponent />)
  } else if(widget.type === 'beat-count') {
    el = (<BeatCountComponent />)
  } else if(widget.type === 'active-track-clip') {
    el = (<ActiveTrackClipWidgetComponent widget={widget} />)
  } else if(widget.type === 'track-sections') {
    el = (<TrackSectionWidgetComponent widget={widget} />)
  } else if(widget.type === 'play-stop') {
    el = (<PlayStopWidgetComponent />)
  }

  const label = widget.label === undefined ? null : (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          x: 0,
          y: '0',
          marginTop: '-16px',
          backgroundColor: '#777777',
          border: '1px solid white',
          // borderRadius: '5px',
          lineHeight: 1,
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
          paddingLeft: '3px',
          paddingRight: '3px',
        }}
      >
        {widget.label}
      </Box>
    </Box>
  )

  const widgetBody = (
    <Box
      sx={{
        p: 2,
        borderSize: `${widget.borderSizePx}px`,
        borderColor: widget.borderColor,
        borderStyle: 'solid',
        borderRadius: '5px',
      }}
    >
      {label}
      <Box>
        {el}
      </Box>
    </Box>
  )

  if(isEdit) {

    return (
      <Paper>
        <Box
          sx={{
            border: '1px solid #777777',
            borderRadius: '5px'
          }}
        >
          <IconButton
            onClick={() => {
              setWidgets(removeWidget(widget))
            }}
            aria-label="Remove Widget"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setWidgets(moveLeftWidget(widget))
            }}
            aria-label="Move Left"
          >
            <ArrowLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setWidgets(moveRightWidget(widget))
            }}
            aria-label="Move Right"
          >
            <ArrowRightIcon />
          </IconButton>
        </Box>
        {widgetBody}
      </Paper>
    )
  } else {
    return widgetBody
  }


}
