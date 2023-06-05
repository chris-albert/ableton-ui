import React from 'react'
import {PrimitiveAtom, useAtomValue} from "jotai";
import {clipsAtom, getHexColor, UITrack} from "../model/UIStateDisplay";
import {Box, Grid} from "@mui/material";
import {splitAtom} from "jotai/utils";
import {ClipComponent} from "./ClipComponent";

export type TrackComponentProps = {
  trackAtom: PrimitiveAtom<UITrack>
}

export const TrackComponent: React.FC<TrackComponentProps> = ({
  trackAtom
}) => {

  const track = useAtomValue(trackAtom)

  const clips = useAtomValue(React.useMemo(() => {
    return splitAtom(clipsAtom(trackAtom))
  }, [trackAtom]))

  return (
    <Grid container spacing={1}>
      <Grid item xs={10} container>
        {clips.map((clip, index) => (
          <Box key={`track-${track.name}-clip-${index}`}>
            <ClipComponent clipAtom={clip} />
          </Box>
        ))}
      </Grid>
      <Grid item xs={2}>
          <Box
            sx={{
              height: 100,
              width: '100%',
              backgroundColor: getHexColor(track)
            }}
          >
            <Box sx={{p: 1}}>
              {track.name}
            </Box>
          </Box>
      </Grid>
    </Grid>
  )
}
