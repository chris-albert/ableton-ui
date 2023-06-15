import React from 'react'
import {ActiveTrackClipWidget} from "../../model/Widgets";
import {useAtomValue} from "jotai";
import {tracksAtom} from "../../model/UIStateDisplay";
import _ from "lodash";
import {Box} from "@mui/material";
import {ActiveTrackClipComponent} from "../ActiveTrackClipComponent";

export type ActiveTrackClipWidgetComponentProps = {
  widget: ActiveTrackClipWidget
}

export const ActiveTrackClipWidgetComponent: React.FC<ActiveTrackClipWidgetComponentProps> = ({
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
      <ActiveTrackClipComponent track={track} />
    )
  }
}
