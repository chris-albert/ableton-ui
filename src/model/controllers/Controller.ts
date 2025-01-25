import React from 'react'
import { Data, Option } from 'effect'
import { MidiMessage } from '../../midi/WindowMidi'
import _ from 'lodash'
import { Color } from '../../components/controllers/Color'

export type ControllerPadTarget = Data.TaggedEnum<{
  Note: { note: number }
  CC: { controllerNumber: number }
}>

export const ControllerPadTarget = Data.taggedEnum<ControllerPadTarget>()

export const ControllerPadNote = (note: number) => ControllerPadTarget.Note({ note })

export type ControllerPadColor = {
  target: ControllerPadTarget
  color: number | undefined
}

export const targetToKey = (target: ControllerPadTarget): string =>
  ControllerPadTarget.$match({
    Note: ({ note }) => `noteon-${note}`,
    CC: ({ controllerNumber }) => `cc-${controllerNumber}`,
  })(target)

export const messageToKey = (message: MidiMessage): string => {
  if (message.type === 'noteon' && message.velocity > 0) {
    return `noteon-${message.note}`
  } else if (message.type === 'cc') {
    return `cc-${message.controllerNumber}`
  } else {
    return ''
  }
}

export const targetToMessage = (target: ControllerPadTarget, value: number): MidiMessage =>
  ControllerPadTarget.$match({
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
  })(target)

export const targetToValue = (target: ControllerPadTarget): number =>
  ControllerPadTarget.$match({
    Note: ({ note }) => note,
    CC: ({ controllerNumber }) => controllerNumber,
  })(target)

export class ControllerPad extends Data.Class<{
  target: ControllerPadTarget
  content: React.ReactElement
}> {
  message(value: number): MidiMessage {
    return targetToMessage(this.target, value)
  }
}

/**
 * The `pads` are laid out from top left to bottom right
 */
export class Controller extends Data.Class<{
  pads: Array<Array<ControllerPad>>
  init: () => void
  render: (pads: Array<ControllerPadColor>) => void
  on: (f: (m: MidiMessage) => void) => void
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

  clear() {
    this.render(
      _.flatMap(this.pads, (padRow) =>
        _.map(padRow, (pad) => ({
          target: pad.target,
          color: Color.BLACK,
        })),
      ),
    )
  }
}

export const emptyController: Controller = new Controller({
  pads: [],
  init: () => {},
  render: () => {},
  on: () => {},
})

export const midiFromRowCol = (row: number, column: number): number => parseInt(`${row}${column + 1}`)
