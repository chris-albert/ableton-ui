import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {MidiInput, MidiOutput, SysExMessage, WindowMidi} from "../midi/WindowMidi";
import React from "react";
import getMidiAccess from "../midi/MidiAccess";
import {parseAbletonUIMessage} from "../model/AbletonUIMessage";
import {toast} from "react-toastify";
import {
  initClip, initCue,
  initDone,
  initProject,
  initProjectAtom,
  initTrack,
  projectAtom
} from "../model/UIStateDisplay";
import {barBeatsAtom, beatsAtom, isPlayingAtom, tempoAtom, timeSignatureAtom} from "../model/RealTime";

export const midiRXStatusAtom = atom(false)
export const midiTXStatusAtom = atom(false)

export const windowMidiAtom = atom<WindowMidi | undefined>(undefined)
export const midiInputAtom = atom<MidiInput | undefined>(undefined)
export const midiOutputAtom = atom<MidiOutput | undefined>(undefined)

export const useWindowMidi = (): WindowMidi | undefined =>
  useAtomValue(windowMidiAtom)

export const useSetMidiInput = () =>
  useSetAtom(midiInputAtom)

export const useMidiInput = () =>
  useAtomValue(midiInputAtom)

export const useSetMidiOutput = () =>
  useSetAtom(midiOutputAtom)

export const useMidiOutput = () =>
  useAtomValue(midiOutputAtom)

type ProjectImportStatus = 'none' | 'importing' | 'finalizing' | 'done' | 'error'

export const useMidiInit = (): void => {

  const [windowMidi, setWindowMidi] = useAtom(windowMidiAtom)

  React.useEffect(() => {
    getMidiAccess(true)
      .then(midi => {
        setWindowMidi(midi)
      })
      .catch(console.error)
  }, [])

  const midiInput = useAtomValue(midiInputAtom)
  const setProject = useSetAtom(projectAtom)
  const setInitProject = useSetAtom(initProjectAtom)
  const initProjectValue = useAtomValue(initProjectAtom)
  const setBeats = useSetAtom(beatsAtom)
  const setBarBeats = useSetAtom(barBeatsAtom)
  const setTimeSignature = useSetAtom(timeSignatureAtom)
  const setTempo = useSetAtom(tempoAtom)
  const setIsPlaying = useSetAtom(isPlayingAtom)
  const [midiStatus, setMidiStatus] = useAtom(midiRXStatusAtom)
  const [projectImportStatus, setProjectImportStatus] = React.useState<ProjectImportStatus>('none')

  React.useEffect(() => {
    if(midiStatus) {
      setMidiStatus(false)
    }
  }, [midiStatus])

  React.useEffect(() => {
    if(projectImportStatus === 'finalizing') {
      const project = initDone(initProjectValue)
      setProject(project)
      setProjectImportStatus('done')
      toast.success(`Imported project with ${project.tracks.length} tracks.`)
    }
  }, [projectImportStatus, initProjectValue])

  const onSysex = React.useCallback((sysex: SysExMessage) => {
    setMidiStatus(true)
    const msg = parseAbletonUIMessage(sysex)
    if(msg !== undefined) {
      if (msg.type === 'init-project') {
        toast.info('Importing new project.')
        setProjectImportStatus('importing')
        setInitProject(initProject(msg))
      } else if (msg.type === 'init-track') {
        setInitProject(initTrack(msg))
      } else if (msg.type === 'init-clip') {
        setInitProject(initClip(msg))
      } else if (msg.type === 'init-cue') {
        setInitProject(initCue(msg))
      } else if (msg.type === 'init-done') {
        setProjectImportStatus('finalizing')
      } else if (msg.type === 'beat') {
        setBeats(msg.value)
      } else if (msg.type === 'sig') {
        setTimeSignature({
          noteCount: msg.numer,
          noteLength: msg.denom
        })
      } else if (msg.type === 'bar-beat') {
        setBarBeats(msg.value)
      } else if (msg.type === 'tempo') {
        setTempo(msg.value)
      } else if(msg.type === 'is-playing') {
        setIsPlaying(msg.value)
      }
    }
  }, [])

  React.useEffect(() => {
    if(midiInput !== undefined) {
      return midiInput.on('sysex', onSysex)
    }
  }, [midiInput, onSysex])
}