import React from 'react'
import {Box} from "@mui/material";
import {Nav} from "../Nav";
import {Outlet} from "react-router-dom"
import {Project} from "../model/Projects";

export type LayoutProps = {
  project: Project
}

export const Layout: React.FC<LayoutProps> = ({
  project
}) => {

  return (
    <Box>
      <Nav project={project}/>
      <Outlet />
    </Box>
  )
}
