import { buildInputDevice, buildOutputDevice, WindowMidi } from './WindowMidi'

const mapToArray = (map: any): Array<any> => {
  const arr: Array<any> = []
  map.forEach((v: any) => {
    arr.push(v)
  })

  return arr
}

const buildWindowMidi = (access: any): WindowMidi => {
  return {
    isAllowed: true,
    inputs: mapToArray(access.inputs).map(buildInputDevice),
    outputs: mapToArray(access.outputs).map(buildOutputDevice),
  }
}

export function getMidiAccess(sysex = false): Promise<WindowMidi> {
  const navigator: any = window.navigator
  return typeof window !== 'undefined' && navigator && typeof navigator.requestMIDIAccess === 'function'
    ? navigator.requestMIDIAccess({ sysex }).then(buildWindowMidi)
    : new Promise((resolve, reject) => reject(new Error('MIDI Not Available')))
}

export default getMidiAccess
