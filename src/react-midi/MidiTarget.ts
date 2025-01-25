import { Data } from 'effect'

export type MidiTarget = Data.TaggedEnum<{
  Note: { note: number }
  CC: { controllerNumber: number }
  PC: {}
}>

const _MidiTarget = Data.taggedEnum<MidiTarget>()

const note = (note: number): MidiTarget => _MidiTarget.Note({ note })

const cc = (controllerNumber: number): MidiTarget => _MidiTarget.CC({ controllerNumber })

const pc = (): MidiTarget => _MidiTarget.PC()

export const MidiTarget = {
  note,
  cc,
  pc,
}
