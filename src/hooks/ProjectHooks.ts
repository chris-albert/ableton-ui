import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ProjectMidi } from '../midi/ProjectMidi'
import React from 'react'
import _ from 'lodash'

export const ProjectHooks = {
  useArrangement: () => {
    const activeProject = useAtomValue(ProjectMidi.atoms.project.active)
    const arrangement = React.useMemo(
      () => ProjectMidi.atoms.project.arrangement(activeProject),
      [activeProject],
    )
    return useAtomValue(arrangement)
  },
  useWidgets: () => {
    const activeProject = useAtomValue(ProjectMidi.atoms.project.active)
    const widgets = React.useMemo(() => ProjectMidi.atoms.project.widgets(activeProject), [activeProject])
    return useAtom(widgets)
  },
  useProjectsConfig: () => useAtom(ProjectMidi.atoms.projectsConfig),
  useActiveProjectLabel: () => {
    const activeProject = useAtomValue(ProjectMidi.atoms.project.active)
    const projects = useAtomValue(ProjectMidi.atoms.projectsConfig)
    const project = _.get(projects.projects, activeProject, undefined)
    if (project !== undefined) {
      return project.name
    } else {
      return undefined
    }
  },
  useSetActiveProject: () => useSetAtom(ProjectMidi.atoms.project.active),
}
