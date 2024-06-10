import React from 'react';
import * as E from 'fp-ts/Either'
import './styles.scss'
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
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
import {Project, useActiveProject} from "./model/Projects";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

type AppWithoutProjectProps = {
  message: string
}

const AppWithoutProject: React.FC<AppWithoutProjectProps> = ({
  message
}) => {
  return (
    <Box>Unable to load project with error message: {message}</Box>
  )
}

type AppWithProjectProps = {
  project: Project
}

const AppWithProject: React.FC<AppWithProjectProps> = ({
  project
}) => {

  useMidiInit(project)

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
                <Layout project={project} />
              }
            >
              <Route
                index
                element={
                  <IndexPage project={project} />
                }
              />
              <Route
                path='arrangement'
                element={
                  <ArrangementComponent project={project}  />
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
                  <SettingsPage project={project} />
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

function App() {

  const project = useActiveProject()

  if(E.isLeft(project)) {
    return (
      <AppWithoutProject message={project.left} />
    )
  } else {
    return (
      <AppWithProject project={project.right} />
    )
  }
}

export default App;
