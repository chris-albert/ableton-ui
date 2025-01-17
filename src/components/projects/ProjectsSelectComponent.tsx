import React from 'react'
import { Box } from '@mui/material'
import { SelectComponent, SelectItem } from '../SelectComponent'
import { Project, ProjectConfig, useProjectsConfig } from '../../model/Projects'
import _ from 'lodash'
import { ProjectHooks } from '../../hooks/ProjectHooks'
import { ProjectMidi } from '../../midi/ProjectMidi'

export type ProjectsSelectComponentProps = {}

export const ProjectsSelectComponent: React.FC<ProjectsSelectComponentProps> = ({}) => {
  const [projectsConfig] = ProjectHooks.useProjectsConfig()
  const setActiveProject = ProjectHooks.useSetActiveProject()

  const [items, setItems] = React.useState<Array<SelectItem<string>>>([])
  // const [activeProjectLabel, setActiveProjectLabel] = React.useState<string | undefined>(undefined)
  const activeProjectLabel = ProjectHooks.useActiveProjectLabel()

  React.useEffect(() => {
    // setActiveProjectLabel(project.config.name)
    setItems(
      _.map(projectsConfig.projects, (p, key) => ({
        label: p.name,
        value: key,
      })),
    )
  }, [projectsConfig])

  const onProjectSelect = (input: string | undefined) => {
    if (input !== undefined) {
      setActiveProject(input)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <SelectComponent
        label='Project'
        items={items}
        onChange={onProjectSelect}
        activeLabel={activeProjectLabel}
      />
    </Box>
  )
}
