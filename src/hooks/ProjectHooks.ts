import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ProjectMidi } from '../midi/ProjectMidi'
import React from 'react'
import _ from 'lodash'
import { focusAtom } from 'jotai-optics'
import { splitAtom } from 'jotai/utils'

const useArrangementAtom = () => {
  const activeProject = useAtomValue(ProjectMidi.atoms.project.active)
  return React.useMemo(() => ProjectMidi.atoms.project.arrangement(activeProject), [activeProject])
}

const useTracksAtom = () => {
  const arrangement = useArrangementAtom()
  return focusAtom(arrangement, (o) => o.prop('tracks'))
}

export const ProjectHooks = {
  useArrangement: () => useAtomValue(useArrangementAtom()),
  useWidgets: () => {
    const activeProject = useAtomValue(ProjectMidi.atoms.project.active)
    return useAtom(React.useMemo(() => ProjectMidi.atoms.project.widgets(activeProject), [activeProject]))
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
  useTracks: () => useAtomValue(useTracksAtom()),
  useTracksAtoms: () => {
    return useAtomValue(splitAtom(useTracksAtom()))
  },
}
