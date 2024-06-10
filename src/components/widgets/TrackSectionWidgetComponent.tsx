import React from 'react'
import _ from "lodash";
import {Box} from "@mui/material";
import {SectionsTrackClipComponent} from "../SectionsTrackClipComponent";
import {TrackSectionsWidget} from "../../model/Widgets";
import {Project} from "../../model/Projects";
import {useTracks} from "../../model/UIStateDisplay";

export type TrackSectionWidgetComponentProps = {
  project: Project,
  widget: TrackSectionsWidget
}

export const TrackSectionWidgetComponent: React.FC<TrackSectionWidgetComponentProps> = ({
  project,
  widget
}) => {

  const trackName = widget.track

  const tracks = useTracks(project)

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
      <SectionsTrackClipComponent track={track} size={widget.size} fontSize={widget.fontSize}/>
    )
  }
}
