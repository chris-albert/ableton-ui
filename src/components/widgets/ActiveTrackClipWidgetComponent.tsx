import React from 'react'
import {ActiveTrackClipWidget} from "../../model/Widgets";
import {useTracks} from "../../model/UIStateDisplay";
import _ from "lodash";
import {Box} from "@mui/material";
import {ActiveTrackClipComponent} from "../ActiveTrackClipComponent";
import {Project} from "../../model/Projects";

export type ActiveTrackClipWidgetComponentProps = {
  project: Project,
  widget: ActiveTrackClipWidget
}

export const ActiveTrackClipWidgetComponent: React.FC<ActiveTrackClipWidgetComponentProps> = ({
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
      <ActiveTrackClipComponent track={track} />
    )
  }
}
