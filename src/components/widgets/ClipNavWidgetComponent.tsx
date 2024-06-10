import React from 'react'
import {ClipNavWidget} from "../../model/Widgets";
import _ from "lodash";
import {Box} from "@mui/material";
import {ClipNavComponent} from "../ClipNavComponent";
import {Project} from "../../model/Projects";
import {useTracks} from "../../model/UIStateDisplay";

export type ClipNavWidgetComponentProps = {
  project: Project,
  widget: ClipNavWidget
}

export const ClipNavWidgetComponent: React.FC<ClipNavWidgetComponentProps> = ({
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
      <ClipNavComponent track={track} project={project} />
    )
  }
}
