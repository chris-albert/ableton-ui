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
import { createJSONStorage } from 'jotai/utils'

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

const atoms = {
  initArrangement: atom<InitArrangement>([]),
  importStatus: atom<ProjectImportStatus>('none'),
  projectsConfig: atomWithStorage<ProjectsConfig>(
    'projects-config',
    defaultProjectsConfig(),
    createJSONStorage(),
    {
      getOnInit: true,
    },
  ),
  project: {
    active: atomWithStorage('active-project', 'default'),
    arrangement: (name: string) =>
      atomWithStorage<UIArrangement>(`arrangement-${name}`, emptyArrangement(), createJSONStorage(), {
        getOnInit: true,
      }),
    widgets: (name: string) =>
      atomWithStorage<Widgets>(`widgets-${name}`, emptyWidgets, createJSONStorage(), {
        getOnInit: true,
      }),
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
      store.set(atoms.project.arrangement(store.get(atoms.project.active)), arrangement)
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
