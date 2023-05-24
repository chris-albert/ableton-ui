import React from 'react'
import {Box, Divider} from "@mui/material";
import {ProjectComponent} from "./components/ProjectComponent";
import {ProjectComponent as ReduxTrackComponent} from "./components/redux/ProjectComponent";
import {ProjectComponent as JotaiTrackComponent} from "./components/jotai/ProjectComponent";
import {ProjectComponent as ZustandTrackComponent} from "./components/zustand/ProjectComponent";

export type BodyProps = {}

export const Body: React.FC<BodyProps> = () => {
  return (
    <Box>
      {/*<ProjectComponent />*/}
      {/*<Divider sx={{m: 4}} />*/}
      {/*<ReduxTrackComponent />*/}

      {/*<ZustandTrackComponent />*/}
      {/*<Divider sx={{m: 4}} />*/}
      <JotaiTrackComponent />
    </Box>
  )
}