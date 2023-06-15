import React from 'react'
import {Widget} from "../model/Widgets";
import {Box} from "@mui/material";
import {TempoComponent} from "./TempoComponent";
import {TimeSignatureComponent} from "./TimeSignatureComponent";
import {BeatCounterComponent} from "./BeatCounterComponent";
import {BarBeatComponent} from "./BarBeatComponent";
import {BeatCountComponent} from "./widgets/BeatCountComponent";
import {ActiveTrackClipWidgetComponent} from "./widgets/ActiveTrackClipWidgetComponent";
import {TrackSectionWidgetComponent} from "./widgets/TrackSectionWidgetComponent";

export type WidgetComponentProps = {
  widget: Widget
}

export const WidgetComponent: React.FC<WidgetComponentProps> = ({
  widget
}) => {

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
  }

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid white'
    }}
    >
      {el}
    </Box>
  )
}
