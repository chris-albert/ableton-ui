import React from 'react';
import './styles.scss'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useMidiContext} from "./contexts/MidiContext";
import {MidiInput} from "./midi/WindowMidi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout} from "./pages/Layout";
import {IndexPage} from "./pages/IndexPage";
import {MidiInputRequiredComponent} from "./components/MidiInputRequiredComponent";
import {MonitorPage} from "./pages/MonitorPage";
import {SettingsPage} from "./pages/SettingsPage";
import {parseAbletonUIMessage} from "./model/AbletonUIMessage";
import {
  initClip,
  initDone,
  initProject,
  initProjectAtom,
  initTrack,
  projectAtom
} from "./model/UIStateDisplay";
import {useAtomValue, useSetAtom} from "jotai";
import {ProjectComponent} from "./components/ProjectComponent";
import {ActiveTrackClipPage} from "./pages/ActiveTrackClipPage";
import {barBeatsAtom, beatsAtom, tempoAtom, timeSignatureAtom} from "./model/RealTime";
import {BeatCounterComponent} from "./components/BeatCounterComponent";
import {BarBeatComponent} from "./components/BarBeatComponent";
import {TimeSignatureComponent} from "./components/TimeSignatureComponent";
import {TempoComponent} from "./components/TempoComponent";
import {SectionsTrackClipPage} from "./pages/SectionsTrackClipPage";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {

  const midi = useMidiContext()
  const [midiInput, setMidiInput] = React.useState<MidiInput | undefined>(undefined)
  const setProject = useSetAtom(projectAtom)
  const setInitProject = useSetAtom(initProjectAtom)
  const initProjectValue = useAtomValue(initProjectAtom)
  const setBeats = useSetAtom(beatsAtom)
  const setBarBeats = useSetAtom(barBeatsAtom)
  const setTimeSignature = useSetAtom(timeSignatureAtom)
  const setTempo = useSetAtom(tempoAtom)

  React.useEffect(() => {
    if(midiInput !== undefined) {
      return midiInput.on('sysex', sysex => {
        const msg = parseAbletonUIMessage(sysex.data)
        if(msg.type === 'init-project') {
          toast.info('Importing new project.')
          setInitProject(initProject(msg))
        } else if (msg.type === 'init-tracks') {
          setInitProject(initTrack(msg))
        } else if (msg.type === 'init-clips') {
          setInitProject(initClip(msg))
        } else if (msg.type === 'init-done') {
          const project = initDone(initProjectValue)
          setProject(project)
          toast.success(`Imported project with ${project.tracks.length} tracks.`)
        } else if(msg.type === 'beat') {
          setBeats(msg.value)
        } else if(msg.type === 'sig') {
          setTimeSignature({
            noteCount: msg.numer,
            noteLength: msg.denom
          })
        } else if(msg.type === 'barBeat') {
          setBarBeats(msg.value)
        } else if(msg.type === 'tempo') {
          setTempo(msg.value)
        }
      })
    }
  }, [setProject, setInitProject, initProjectValue, setBeats, midiInput])

  return (
    <div className="App">
      <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <ToastContainer
              position='bottom-right'
            />
            <CssBaseline />
            <Routes>
              <Route
                path='/'
                element={
                  <Layout midi={midi} onInputSelect={setMidiInput}/>
                }
              >
                <Route
                  index
                  element={
                    <MidiInputRequiredComponent
                      midiInput={midiInput}
                      element={(mi) => (
                        <IndexPage midiInput={mi} />
                      )}
                    />
                  }
                />
                <Route
                  path='project'
                  element={
                    <ProjectComponent />
                  }
                />
                <Route
                  path='project/tracks/:trackName/active'
                  element={
                    <ActiveTrackClipPage />
                  }
                />
                <Route
                  path='project/tracks/:trackName/sections'
                  element={
                    <SectionsTrackClipPage />
                  }
                />
                <Route
                  path='beat'
                  element={
                    <BeatCounterComponent />
                  }
                />
                <Route
                  path='barbeat'
                  element={
                    <BarBeatComponent />
                  }
                />
                <Route
                  path='sig'
                  element={
                    <TimeSignatureComponent />
                  }
                />
                <Route
                  path='tempo'
                  element={
                    <TempoComponent />
                  }
                />
                <Route
                  path='monitor'
                  element={
                    <MidiInputRequiredComponent
                      midiInput={midiInput}
                      element={(mi) => (
                        <MonitorPage midiInput={mi} />
                      )}
                    />
                  }
                />
                <Route
                  path='settings'
                  element={
                    <SettingsPage />
                  }
                />
              </Route>
            </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
