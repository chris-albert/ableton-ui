import {useAtomValue} from "jotai";
import {
  barBeatsAtom,
  beatsAtom,
  isPlayingAtom,
  tempoAtom,
  TimeSignature,
  timeSignatureAtom
} from "../model/RealTime";

export const useBeat = (): number => {
  return useAtomValue(beatsAtom)
}

export const useBarBeats = (): number => {
  return useAtomValue(barBeatsAtom)
}

export const useTimeSignature = (): TimeSignature => {
  return useAtomValue(timeSignatureAtom)
}

export const useTempo = (): number => {
  return useAtomValue(tempoAtom)
}

export const useIsPlaying = (): boolean => {
  return useAtomValue(isPlayingAtom)
}