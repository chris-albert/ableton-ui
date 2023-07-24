import React from 'react'
import {Box} from "@mui/material";
import {Nav} from "../Nav";
import {Outlet} from "react-router-dom"

export type LayoutProps = {}

export const Layout: React.FC<LayoutProps> = ({
}) => {

  return (
    <Box>
      <Nav />
      <Outlet />
    </Box>
  )
}
