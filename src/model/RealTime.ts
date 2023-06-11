import {atom} from "jotai";

export const beatsAtom = atom(0)

export const barBeatsAtom = atom(0)

export type TimeSignature = {
  noteCount: number
  noteLength: number
}

export const timeSignatureAtom = atom<TimeSignature>({
  noteCount: 4,
  noteLength: 4
})

export const tempoAtom = atom(0)