import {
  MidiEventRecord,
  MidiInput,
  MidiMessage,
  MidiMessageWithRaw,
  MidiOutput,
  WindowMidi,
} from './WindowMidi'
import { atom, getDefaultStore, PrimitiveAtom } from 'jotai'
import getMidiAccess from './MidiAccess'
import { atomWithStorage } from 'jotai/utils'
import { EventEmitter } from '../utils/EventEmitter'
import _ from 'lodash'
import { Option, pipe } from 'effect'

export type MidiType = 'daw' | 'controller'
export type MidiDeviceType = 'input' | 'output'

export type MidiIOAtom<I, O> = {
  input: PrimitiveAtom<Option.Option<I>>
  output: PrimitiveAtom<Option.Option<O>>
}

export type MidiSelection = {
  midi: MidiIOAtom<MidiInput, MidiOutput>
  selected: MidiIOAtom<string, string>
}

export type MidiDevices = {
  type: MidiDeviceType
  devices: Array<string>
  setSelected: (name: string | undefined) => void
  selected: string | undefined
}

const store = getDefaultStore()

const listeners = {
  daw: EventEmitter<MidiEventRecord>(),
  controller: EventEmitter<MidiEventRecord>(),
}
export type MidiListener = {
  on: (f: MidiEventRecord) => void
}

export type MidiEmitter = {
  send: (m: MidiMessage) => void
}

const emptyEmitter: MidiEmitter = {
  send: () => {},
}

const emitters = {
  daw: emptyEmitter,
  controller: emptyEmitter,
}

const atoms = {
  windowMidi: atom<WindowMidi>(WindowMidi.empty),
  daw: {
    midi: {
      input: atom<Option.Option<MidiInput>>(Option.none()),
      output: atom<Option.Option<MidiOutput>>(Option.none()),
    },
    selected: {
      input: atomWithStorage<Option.Option<string>>('daw-midi-input-selected', Option.none()),
      output: atomWithStorage<Option.Option<string>>('daw-midi-output-selected', Option.none()),
    },
  },
  controller: {
    midi: {
      input: atom<Option.Option<MidiInput>>(Option.none()),
      output: atom<Option.Option<MidiOutput>>(Option.none()),
    },
    selected: {
      input: atomWithStorage<Option.Option<string>>('controller-midi-input-selected', Option.none()),
      output: atomWithStorage<Option.Option<string>>('controller-midi-output-selected', Option.none()),
    },
  },
}

const windowMidi = () => store.get(atoms.windowMidi)

const findMidiInput = (name: string): Option.Option<MidiInput> =>
  Option.fromNullable(_.find(windowMidi().inputs, (i) => i.name === name))

const findMidiOutput = (name: string): Option.Option<MidiOutput> =>
  Option.fromNullable(_.find(windowMidi().outputs, (i) => i.name === name))

const getMidiInput = (selection: MidiSelection): Option.Option<MidiInput> =>
  pipe(store.get(selection.selected.input), Option.flatMap(findMidiInput))

const getMidiOutput = (selection: MidiSelection): Option.Option<MidiOutput> =>
  pipe(store.get(selection.selected.output), Option.flatMap(findMidiOutput))

const onSelectedInput = (selection: MidiSelection) => {
  store.set(selection.midi.input, getMidiInput(selection))
}

const onSelectedOutput = (selection: MidiSelection) => {
  store.set(selection.midi.output, getMidiOutput(selection))
}

const getByType = (type: MidiType): MidiSelection => (type === 'daw' ? atoms.daw : atoms.controller)

const getSelected = (type: MidiType, deviceType: MidiDeviceType): PrimitiveAtom<Option.Option<string>> =>
  deviceType === 'input' ? getByType(type).selected.input : getByType(type).selected.output

const selectionInit = (midiType: MidiType) => {
  const selection = midiType === 'daw' ? atoms.daw : atoms.controller
  const on = midiType === 'daw' ? listeners.daw.emit : listeners.controller.emit

  // Input Binding
  store.sub(selection.selected.input, () => onSelectedInput(selection))

  let listener: Option.Option<() => void> = Option.none()

  const bindInput = (midiInput: MidiInput) => {
    listener = Option.some(midiInput.on('*', on))
  }

  const unBindInput = () => {
    Option.map(listener, (l) => l())
  }
  store.sub(selection.midi.input, () => {
    unBindInput()
    Option.map(store.get(selection.midi.input), bindInput)
  })

  // Output Binding
  store.sub(selection.selected.output, () => onSelectedOutput(selection))

  const bindOutput = (midiOutput: MidiOutput) => {
    midiType === 'daw' ? (emitters.daw.send = midiOutput.send) : (emitters.controller.send = midiOutput.send)
  }
  const unBindOutput = () => {
    midiType === 'daw' ? (emitters.daw = emptyEmitter) : (emitters.controller = emptyEmitter)
  }
  store.sub(selection.midi.output, () => {
    Option.match(store.get(selection.midi.output), {
      onNone: unBindOutput,
      onSome: bindOutput,
    })
  })

  // If we already have everything set up, then wire it all now
  Option.map(getMidiOutput(selection), bindOutput)
  Option.map(getMidiInput(selection), bindInput)
}

const runInit = () => {
  selectionInit('daw')
  selectionInit('controller')
}

let isInit = false
const init = () => {
  if (!isInit) {
    isInit = true
    getMidiAccess(true)
      .then((midi) => {
        store.set(atoms.windowMidi, midi)
        runInit()
      })
      .catch(console.error)
  }
}

export const Midi = {
  init,
  listeners,
  emitters,
  windowMidi,
  atoms,
  getByType,
  getSelected,
}
