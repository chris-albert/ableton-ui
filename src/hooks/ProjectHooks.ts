import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ProjectMidi } from '../midi/ProjectMidi'
import React from 'react'
import _ from 'lodash'
import { focusAtom } from 'jotai-optics'
import { splitAtom } from 'jotai/utils'
import { emptyTrack, UITrack } from '../model/UIStateDisplay'

const useArrangementAtom = () => {
  const activeProject = useAtomValue(ProjectMidi.atoms.project.active)
  return React.useMemo(() => ProjectMidi.atoms.project.arrangement(activeProject), [activeProject])
}

const useTracksAtom = () => {
  const arrangement = useArrangementAtom()
  return React.useMemo(() => focusAtom(arrangement, (o) => o.prop('tracks')), [arrangement])
}

const useTrackOrUndefined = (trackName: string): UITrack | undefined => {
  const tracks = useAtomValue(useTracksAtom())
  return tracks.find((t) => t.name === trackName)
}

const useTrack = (trackName: string) => {
  const track = useTrackOrUndefined(trackName)
  return track === undefined ? emptyTrack : track
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
  useTrack,
  useTrackOrUndefined,
  useTracksAtoms: () => {
    return useAtomValue(splitAtom(useTracksAtom()))
  },
}
