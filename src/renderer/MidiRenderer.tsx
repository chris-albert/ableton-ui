import { MidiRconciler } from './MidiReconciler'

const render = () => {
  const container = MidiRconciler.instance.createContainer({}, 0, null, true, null, 'Midi', () => {}, null)
}

export const MidiRenderer = {
  render,
}
