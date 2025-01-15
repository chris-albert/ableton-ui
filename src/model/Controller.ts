import React from 'react'
import { Data, Option } from 'effect'
import { MidiMessage } from '../midi/WindowMidi'
import _ from 'lodash'

export type ControllerPadTarget = Data.TaggedEnum<{
  Note: { note: number }
  CC: { controllerNumber: number }
}>

const underlyingControllerPadTarget = Data.taggedEnum<ControllerPadTarget>()

export const ControllerPadTarget = Data.taggedEnum<ControllerPadTarget>()

export const ControllerPadNote = (note: number) => ControllerPadTarget.Note({ note })

export class ControllerPad extends Data.Class<{
  target: ControllerPadTarget
  content: React.ReactElement
}> {
  message(value: number): MidiMessage {
    return ControllerPadTarget.$match({
      Note: ({ note }) =>
        ({
          type: 'noteon',
          channel: 1,
          note,
          velocity: value,
        }) as MidiMessage,
      CC: ({ controllerNumber }) =>
        ({
          type: 'cc',
          channel: 1,
          controllerNumber,
          data: value,
        }) as MidiMessage,
    })(this.target)
  }
}

/**
 * The `pads` are laid out from top left to bottom right
 */
export class Controller extends Data.Class<{
  pads: Array<Array<ControllerPad>>
}> {
  private noteLookup: Record<number, ControllerPad> = _.fromPairs(
    _.compact(
      _.flatMap(this.pads, (r) =>
        _.map(r, (p) =>
          ControllerPadTarget.$match({
            Note: ({ note }) => [note, p],
            CC: () => undefined,
          })(p.target),
        ),
      ),
    ),
  )

  foreach(f: (pad: ControllerPad) => void): void {
    this.pads.forEach((row) => row.forEach(f))
  }

  find(midi: MidiMessage): Option.Option<ControllerPad> {
    if (midi.type === 'noteon') {
      const res = _.get(this.noteLookup, midi.note)
      if (res !== undefined && midi.velocity > 0) {
        return Option.some(res)
      }
    }
    return Option.none()
  }
}

export const midiFromRowCol = (row: number, column: number): number => parseInt(`${row}${column + 1}`)
