import React from 'react'
import {
  AppBar,
  Box,
  Toolbar, Grid,
} from "@mui/material";
import {TransportComponent} from "./components/TransportComponent";
import {MidiInputComponent} from "./components/MidiInputComponent";
import {MidiInput, WindowMidi} from "./midi/WindowMidi";

export type NavProps = {
  midi: WindowMidi
  onInputSelect: (i: MidiInput) => void
}

export const Nav: React.FC<NavProps> = ({
    midi,
    onInputSelect
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Grid container >
            <Grid item xs={4}>
              <MidiInputComponent
                  midi={midi}
                  onInputSelect={onInputSelect}
              />
            </Grid>
            <Grid item xs={4} container justifyContent="center">
              {/*Center*/}
            </Grid>
            <Grid item xs={4} container justifyContent="right">
              {/*Right*/}
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
    </Box>
  )
}