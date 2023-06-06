import React from 'react'
import {Box, Grid} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useAtom} from "jotai";
import {zoomAtom} from "../model/Settings";

export type ProjectTimelineComponentProps = {}

export const ProjectTimelineComponent: React.FC<ProjectTimelineComponentProps> = ({

}) => {

  const [zoom, setZoom] = useAtom(zoomAtom)

  return (
    <Box sx={{height: 40, width: '100%'}}>
      <Grid container spacing={1}>
        <Grid item xs={10} container>

        </Grid>
        <Grid item xs={2} container sx={{mt: '4px'}}>
          <Box
            sx={{cursor: 'pointer'}}
            onClick={() => setZoom(z => z + 1)}
          >
            <AddCircleOutlineIcon/>
          </Box>
          <Box
            sx={{cursor: 'pointer'}}
            onClick={() => setZoom(z => z - 1)}
          >
            <RemoveCircleOutlineIcon/>
          </Box>
          <Box sx={{ml: 1}}>{zoom}</Box>
        </Grid>
      </Grid>
    </Box>
  )
}
