import React from 'react';
import './styles.scss'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./pages/Layout";
import {IndexPage} from "./pages/IndexPage";
import {MidiInputRequiredComponent} from "./components/MidiInputRequiredComponent";
import {MonitorPage} from "./pages/MonitorPage";
import {SettingsPage} from "./pages/SettingsPage";
import {ProjectComponent} from "./components/ProjectComponent";
import {ActiveTrackClipPage} from "./pages/ActiveTrackClipPage";
import {BeatCounterComponent} from "./components/BeatCounterComponent";
import {BarBeatComponent} from "./components/BarBeatComponent";
import {TimeSignatureComponent} from "./components/TimeSignatureComponent";
import {TempoComponent} from "./components/TempoComponent";
import {SectionsTrackClipPage} from "./pages/SectionsTrackClipPage";
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {useMidiInit} from "./hooks/Midi";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {

  useMidiInit()

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
                  <Layout />
                }
              >
                <Route
                  index
                  element={
                    <IndexPage />
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
