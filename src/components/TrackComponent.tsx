import React from 'react'
import {PrimitiveAtom, useAtomValue} from "jotai";
import {getHexColor, UITrack} from "../model/UIStateDisplay";
import {Box} from "@mui/material";

export type TrackComponentProps = {
  trackAtom: PrimitiveAtom<UITrack>
}

export const TrackComponent: React.FC<TrackComponentProps> = ({
  trackAtom
}) => {

  const track = useAtomValue(trackAtom)

  return (
    <Box
      sx={{
        height: 100,
        width: '100%',
        backgroundColor: getHexColor(track)
    }}
    >
      {track.name}
    </Box>
  )
}
