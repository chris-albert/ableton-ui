import { Midi } from './GlobalMidi'
import {
  emptyArrangement,
  initArrangement,
  InitArrangement,
  initClip,
  initCue,
  initDone,
  initTrack,
  UIArrangement,
} from '../model/UIStateDisplay'
import { atom, getDefaultStore } from 'jotai'
import { parseAbletonUIMessage } from '../model/AbletonUIMessage'
import * as t from 'io-ts'
import { atomWithStorage, splitAtom } from 'jotai/utils'
import { emptyWidgets, Widgets } from '../model/Widgets'
import { focusAtom } from 'jotai-optics'

const store = getDefaultStore()

let isInit = false
const init = () => {
  if (!isInit) {
    isInit = true
    ProjectListener()
  }
}

export const ProjectConfig = t.type({
  name: t.string,
})

export type ProjectConfig = t.TypeOf<typeof ProjectConfig>

export const ProjectsConfig = t.type({
  projects: t.record(t.string, ProjectConfig),
})

export type ProjectsConfig = t.TypeOf<typeof ProjectsConfig>

const defaultProjectsConfig: () => ProjectsConfig = () => ({
  projects: {
    default: {
      name: 'Default',
    },
  },
})

export type TimeSignature = {
  noteCount: number
  noteLength: number
}

export type ProjectImportStatus = 'none' | 'importing' | 'finalizing' | 'done' | 'error'

const activeProject = atomWithStorage('active-project', 'default')
const getArrangement = (name: string) =>
  atomWithStorage<UIArrangement>(`arrangement-${name}`, emptyArrangement())

const arrangement = getArrangement(store.get(activeProject))
const tracks = focusAtom(arrangement, (o) => o.prop('tracks'))

const atoms = {
  initArrangement: atom<InitArrangement>([]),
  importStatus: atom<ProjectImportStatus>('none'),
  projectsConfig: atomWithStorage<ProjectsConfig>('projects-config', defaultProjectsConfig()),
  project: {
    active: activeProject,
    getArrangement,
    arrangement,
    widgets: (name: string) => atomWithStorage<Widgets>(`widgets-${name}`, emptyWidgets),
    tracks,
    tracksAtoms: splitAtom(tracks),
  },
  realTime: {
    beats: atom(0),
    barBeats: atom(0),
    timeSignature: atom<TimeSignature>({
      noteCount: 4,
      noteLength: 4,
    }),
    tempo: atom(0),
    isPlaying: atom(false),
  },
}

const ProjectListener = () => {
  store.sub(atoms.importStatus, () => {
    const status = store.get(atoms.importStatus)
    if (status === 'finalizing') {
      const arrangement = initDone(store.get(atoms.initArrangement))
      store.set(atoms.project.arrangement, arrangement)
      store.set(atoms.importStatus, 'done')
    }
  })

  Midi.listeners.daw.on('sysex', (sysex) => {
    const msg = parseAbletonUIMessage(sysex)
    if (msg !== undefined) {
      if (msg.type === 'init-project') {
        store.set(atoms.importStatus, 'importing')
        store.set(atoms.initArrangement, initArrangement(msg))
      } else if (msg.type === 'init-track') {
        store.set(atoms.initArrangement, initTrack(msg))
      } else if (msg.type === 'init-clip') {
        store.set(atoms.initArrangement, initClip(msg))
      } else if (msg.type === 'init-cue') {
        store.set(atoms.initArrangement, initCue(msg))
      } else if (msg.type === 'init-done') {
        store.set(atoms.importStatus, 'finalizing')
      } else if (msg.type === 'beat') {
        store.set(atoms.realTime.beats, msg.value)
      } else if (msg.type === 'sig') {
        store.set(atoms.realTime.timeSignature, {
          noteCount: msg.numer,
          noteLength: msg.denom,
        })
      } else if (msg.type === 'bar-beat') {
        store.set(atoms.realTime.barBeats, msg.value)
      } else if (msg.type === 'tempo') {
        store.set(atoms.realTime.tempo, msg.value)
      } else if (msg.type === 'is-playing') {
        store.set(atoms.realTime.isPlaying, msg.value)
      }
    }
  })
}

const onStatusChange = (f: (status: ProjectImportStatus) => void) => {
  return store.sub(atoms.importStatus, () => f(store.get(atoms.importStatus)))
}

export const ProjectMidi = {
  init,
  atoms,
  onStatusChange,
}
