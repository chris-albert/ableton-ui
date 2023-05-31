import React from 'react'
import {MidiInput, WindowMidi} from "../midi/WindowMidi";
import {Box} from "@mui/material";
import {Nav} from "../Nav";
import {Outlet} from "react-router-dom"

export type LayoutProps = {
  midi: WindowMidi | undefined
  onInputSelect: (i: MidiInput) => void
}

export const Layout: React.FC<LayoutProps> = ({
  midi,
  onInputSelect
}) => {

  return (
    <Box>
      <Nav midi={midi} onInputSelect={onInputSelect} />
      <Outlet />
    </Box>
  )
}
