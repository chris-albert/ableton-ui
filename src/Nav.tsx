import React from 'react'
import {
  AppBar,
  Box,
  Toolbar, Grid,
} from "@mui/material";
import {TransportComponent} from "./components/TransportComponent";
import {MidiInputComponent} from "./components/MidiInputComponent";

export type NavProps = {

}

export const Nav: React.FC<NavProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Grid container >
            <Grid item xs={4}>
              <MidiInputComponent />
            </Grid>
            <Grid item xs={4} container justifyContent="center">
              Center
            </Grid>
            <Grid item xs={4} container justifyContent="right">
              Right
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </Box>
  )
}