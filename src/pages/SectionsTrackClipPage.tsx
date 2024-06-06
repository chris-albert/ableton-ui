import React from 'react'
import {useParams} from "react-router-dom";
import {useAtomValue} from "jotai";
import {tracksAtom} from "../model/UIStateDisplay";
import _ from "lodash";
import {Box} from "@mui/material";
import {SectionsTrackClipComponent} from "../components/SectionsTrackClipComponent";

export type SectionsTrackClipPageProps = {}

export const SectionsTrackClipPage: React.FC<SectionsTrackClipPageProps> = ({}) => {

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
      <SectionsTrackClipComponent track={track} size={8} fontSize='1em'/>
    )
  }
}
