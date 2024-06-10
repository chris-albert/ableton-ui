import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import {atomWithStorage} from "jotai/utils";
import {emptyArrangement, UIArrangement} from "./UIStateDisplay";
import {emptyWidgets, Widgets} from "./Widgets";
import {Atom, useAtomValue, WritableAtom, PrimitiveAtom, useAtom} from "jotai";
import _ from 'lodash'

export const ProjectConfig = t.type({
  name: t.string
})

export type ProjectConfig = t.TypeOf<typeof ProjectConfig>

export const ProjectsConfig = t.type({
  projects: t.record(t.string, ProjectConfig),
  activeProject: t.string
})

export type ProjectsConfig = t.TypeOf<typeof ProjectsConfig>

export const defaultProjectsConfig: () => ProjectsConfig = () => ({
  projects: {
    'default': {
      name: 'Default'
    }
  },
  activeProject: 'default'
})

export const projectsConfigAtom = atomWithStorage('projects-config', defaultProjectsConfig())

export const useProjectsConfig = () => useAtom(projectsConfigAtom)

export type Project = {
  config: ProjectConfig,
  arrangementAtom: PrimitiveAtom<UIArrangement>,
  widgetsAtom: PrimitiveAtom<Widgets>
}

export const useActiveProject: () => E.Either<string, Project> = () => {

  const projectConfig = useAtomValue(projectsConfigAtom)
  const activeProjectConfig = _.get(projectConfig.projects, projectConfig.activeProject)
  if(activeProjectConfig === undefined) {
    return E.left("Invalid project!")
  } else {
    return E.right({
      config: activeProjectConfig,
      arrangementAtom: atomWithStorage(`arrangement-${projectConfig.activeProject}`, emptyArrangement()),
      widgetsAtom: atomWithStorage(`widgets-${projectConfig.activeProject}`, emptyWidgets),
    })
  }
}