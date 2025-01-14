import React from 'react'
import { Project } from '../model/Projects'
import { Box } from '@mui/material'
import { LaunchpadMiniComponent } from '../components/controllers/LaunchpadMiniComponent'

export type ControllersPageProps = {
  project: Project
}

export const ControllersPage: React.FC<ControllersPageProps> = ({ project }) => {
  return (
    <Box>
      <LaunchpadMiniComponent />
    </Box>
  )
}
