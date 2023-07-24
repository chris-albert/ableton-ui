import React from 'react'
import {
  AppBar,
  Box,
  Toolbar, Grid, Drawer, List
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MidiInputComponent} from "./components/MidiInputComponent";
import {NavLinkItem} from "./components/NavLinkItem";

export type NavProps = {}

export const Nav: React.FC<NavProps> = () => {

  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Drawer
          anchor='left'
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <Box
            role="presentation"
            sx={{width: 250}}
          >
            <List>
              <NavLinkItem
                path='/'
                label='Home'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/project'
                label='Project'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/beat'
                label='Beat Counter'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/sig'
                label='Time Signature'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/barbeat'
                label='Bar Beat Counter'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/tempo'
                label='Tempo'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/monitor'
                label='MIDI Monitor'
                onClick={() => setMenuOpen(false)}
              />
              <NavLinkItem
                path='/settings'
                label='Settings'
                onClick={() => setMenuOpen(false)}
              />
            </List>
          </Box>
        </Drawer>
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container >
            <Grid item xs={4}>
              <MidiInputComponent />
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