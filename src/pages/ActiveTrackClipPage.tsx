import React from 'react'
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {ActiveTrackClipComponent} from "../components/ActiveTrackClipComponent";
import {useAtomValue} from "jotai";
import {tracksAtom} from "../model/UIStateDisplay";
import _ from "lodash";

export type ActiveTrackClipPageProps = {}

export const ActiveTrackClipPage: React.FC<ActiveTrackClipPageProps> = ({}) => {

  const {trackName} = useParams()

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
