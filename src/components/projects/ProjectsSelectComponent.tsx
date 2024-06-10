import React from 'react'
import {Box} from "@mui/material";
import {SelectComponent, SelectItem} from "../SelectComponent";
import {Project, ProjectConfig, useProjectsConfig} from "../../model/Projects";
import _ from 'lodash'

export type ProjectsSelectComponentProps = {
  project: Project
}

export const ProjectsSelectComponent: React.FC<ProjectsSelectComponentProps> = ({
  project
}) => {

  const [projectsConfig, setProjectsConfig] = useProjectsConfig()

  const [items, setItems] = React.useState<Array<SelectItem<string>>>([])
  const [activeProjectLabel, setActiveProjectLabel] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setActiveProjectLabel(project.config.name)
    setItems(_.map(projectsConfig.projects, (p, key) => ({
      label: p.name,
      value: key
    })))
  }, [projectsConfig, project])

  const onProjectSelect = (input: string | undefined) => {
    if(input !== undefined) {
      setProjectsConfig(pc => ({...pc, activeProject: input}))
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center'
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
