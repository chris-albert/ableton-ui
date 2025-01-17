import React from 'react'
import { Box } from '@mui/material'
import { Nav } from '../Nav'
import { Outlet } from 'react-router-dom'
import { Project } from '../model/Projects'
import { MidiHooks } from '../hooks/MidiHooks'

export type LayoutProps = {}

export const Layout: React.FC<LayoutProps> = ({}) => {
  const windowMidi = MidiHooks.useWindowMidi()

  return (
    <Box>
      <Nav />
      {windowMidi.isAllowed ? <Outlet /> : null}
    </Box>
  )
}
