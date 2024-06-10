import React from 'react';
import './styles.scss'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./pages/Layout";
import {IndexPage} from "./pages/IndexPage";
import {MidiInputRequiredComponent} from "./components/MidiInputRequiredComponent";
import {MonitorPage} from "./pages/MonitorPage";
import {SettingsPage} from "./pages/SettingsPage";
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {useMidiInit} from "./hooks/Midi";
import {ArrangementComponent} from "./components/arrangement/ArrangementComponent";

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
                  path='arrangement'
                  element={
                    <ArrangementComponent />
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
