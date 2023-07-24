import React from 'react'
import {useAtomValue} from "jotai" ;
import {tracksAtom} from "../../model/UIStateDisplay";
import _ from "lodash";
import {Box} from "@mui/material";
import {SectionsTrackClipComponent} from "../SectionsTrackClipComponent";
import {TrackSectionsWidget} from "../../model/Widgets";

export type TrackSectionWidgetComponentProps = {
  widget: TrackSectionsWidget
}

export const TrackSectionWidgetComponent: React.FC<TrackSectionWidgetComponentProps> = ({
  widget
}) => {

  const trackName = widget.track

  const tracks = useAtomValue(tracksAtom)

  const track = React.useMemo(() => {
    if(trackName !== undefined) {
      return _.find(tracks, t => t.name === trackName)
    }
  }, [trackName])

  if(track === undefined) {
    return (
      <Box>No track name defined</Box>
    )
  } else {
    return (
      <SectionsTrackClipComponent track={track} size={widget.size}/>
    )
  }
}
