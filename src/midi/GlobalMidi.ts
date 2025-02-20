import { MidiEventRecord, MidiInput, MidiMessage, MidiOutput, WindowMidi } from './WindowMidi'
import { atom, getDefaultStore, PrimitiveAtom, useAtomValue } from 'jotai'
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

export type MidiListener = Omit<EventEmitter<MidiEventRecord>, 'emit'>

// const listeners = {
//   daw: EventEmitter<MidiEventRecord>(),
//   controller: EventEmitter<MidiEventRecord>(),
// }

export type MidiEmitter = {
  send: (m: MidiMessage) => void
}

const emptyEmitter = (): MidiEmitter => ({
  send: (message: MidiMessage) => {
    console.debug('Empty send', message)
  },
})

// const emitters = {
//   daw: emptyEmitter(),
//   controller: emptyEmitter(),
// }

const atoms = {
  windowMidi: atom<WindowMidi>(WindowMidi.empty),
  daw: {
    emitter: atom<MidiEmitter>(emptyEmitter()),
    listener: atom<MidiListener>(EventEmitter<MidiEventRecord>()),
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
    emitter: atom<MidiEmitter>(emptyEmitter()),
    listener: atom<MidiListener>(EventEmitter<MidiEventRecord>()),
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

  // Input Binding
  store.sub(selection.selected.input, () => onSelectedInput(selection))

  const bindInput = (midiInput: MidiInput) => {
    midiType === 'daw'
      ? store.set(atoms.daw.listener, midiInput)
      : store.set(atoms.controller.listener, midiInput)
  }

  const unBindInput = () => {
    store.set(atoms.daw.listener, { on: () => () => {} })
    store.set(atoms.controller.listener, { on: () => () => {} })
  }
  store.sub(selection.midi.input, () => {
    unBindInput()
    Option.map(store.get(selection.midi.input), bindInput)
  })

  // Output Binding
  store.sub(selection.selected.output, () => onSelectedOutput(selection))

  const bindOutput = (midiOutput: MidiOutput) => {
    const loggingSend = (message: MidiMessage) => {
      console.debug(`Sending ${midiType}`, message)
      midiOutput.send(message)
    }
    midiType === 'daw'
      ? store.set(atoms.daw.emitter, { send: loggingSend })
      : store.set(atoms.controller.emitter, { send: loggingSend })
  }
  const unBindOutput = () => {
    midiType === 'daw'
      ? store.set(atoms.daw.emitter, emptyEmitter())
      : store.set(atoms.controller.emitter, emptyEmitter())
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

let initPromise: Promise<void> | undefined = undefined
const init = (): Promise<void> => {
  if (initPromise === undefined) {
    initPromise = getMidiAccess(true)
      .then((midi) => {
        store.set(atoms.windowMidi, midi)
        runInit()
      })
      .catch(console.error)
    return initPromise
  } else {
    return initPromise
  }
}

export const Midi = {
  init,
  windowMidi,
  // atoms,
  getByType,
  getSelected,
  //Hooks
  useWindowMidi: () => useAtomValue(atoms.windowMidi),
  useControllerMidiInput: () => useAtomValue(atoms.controller.midi.input),
  useControllerMidiOutput: () => useAtomValue(atoms.controller.midi.output),
  useDawEmitter: () => useAtomValue(atoms.daw.emitter),
  useControllerEmitter: () => useAtomValue(atoms.controller.emitter),
  useDawListener: () => useAtomValue(atoms.daw.listener),
  useControllerListener: () => useAtomValue(atoms.controller.listener),
  //Temporary exports
  dawListener: store.get(atoms.daw.listener),
  dawListenerAtom: atoms.daw.listener,
}
