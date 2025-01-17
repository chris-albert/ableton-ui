import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { atomWithStorage } from 'jotai/utils'
import { emptyArrangement, UIArrangement } from './UIStateDisplay'
import { emptyWidgets, Widgets } from './Widgets'
import { Atom, useAtomValue, WritableAtom, PrimitiveAtom, useAtom, atom } from 'jotai'
import _ from 'lodash'

export const ProjectConfig = t.type({
  name: t.string,
})

export type ProjectConfig = t.TypeOf<typeof ProjectConfig>

export const ProjectsConfig = t.type({
  projects: t.record(t.string, ProjectConfig),
})

export type ProjectsConfig = t.TypeOf<typeof ProjectsConfig>

export const defaultProjectsConfig: () => ProjectsConfig = () => ({
  projects: {
    default: {
      name: 'Default',
    },
  },
})

export const projectsConfigAtom = atomWithStorage('projects-config', defaultProjectsConfig())

export const useProjectsConfig = () => useAtom(projectsConfigAtom)

export type Project = {
  config: ProjectConfig
  arrangementAtom: PrimitiveAtom<UIArrangement>
  widgetsAtom: PrimitiveAtom<Widgets>
}

export const useActiveProject: () => E.Either<string, Project> = () => {
  // const projectConfig = useAtomValue(projectsConfigAtom)
  // const activeProjectConfig = _.get(projectConfig.projects, projectConfig.activeProject)
  // if (activeProjectConfig === undefined) {
  // return E.left('Invalid project!')
  // } else {
  return E.right({
    config: {
      name: 'Default',
    },
    arrangementAtom: atom(emptyArrangement()),
    widgetsAtom: atom(emptyWidgets),
  })
  // }
}

export const setArrangement = (arrangement: UIArrangement) => {}

export const Projects = {
  setArrangement,
}
