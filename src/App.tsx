import React from 'react'
import * as E from 'fp-ts/Either'
import './styles.scss'
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { IndexPage } from './pages/IndexPage'
import { SettingsPage } from './pages/SettingsPage'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { ArrangementComponent } from './components/arrangement/ArrangementComponent'
import { Project, useActiveProject } from './model/Projects'
import { ControllersPage } from './pages/ControllersPage'
import { MidiPage } from './pages/MidiPage'
import { ProjectMidi } from './midi/ProjectMidi'
import { Midi } from './midi/GlobalMidi'
import { ControllerMidi } from './midi/ControllerMidi'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
})

type AppWithoutProjectProps = {
  message: string
}

const AppWithoutProject: React.FC<AppWithoutProjectProps> = ({ message }) => {
  return <Box>Unable to load project with error message: {message}</Box>
}

type AppWithProjectProps = {
  project: Project
}

const AppWithProject: React.FC<AppWithProjectProps> = ({ project }) => {
  Midi.init()
  ProjectMidi.init()
  ControllerMidi.init()

  React.useEffect(
    () =>
      ProjectMidi.onStatusChange((status) => {
        if (status === 'importing') {
          toast.info('Importing new project.')
        } else if (status === 'done') {
          toast.success(`Successfully imported project!`)
        }
      }),
    [],
  )

  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <ToastContainer position='bottom-right' />
          <CssBaseline />
          <Routes>
            <Route
              path='/'
              element={<Layout />}>
              <Route
                index
                element={<IndexPage project={project} />}
              />
              <Route
                path='arrangement'
                element={<ArrangementComponent project={project} />}
              />
              <Route
                path='midi'
                element={<MidiPage />}
              />
              <Route
                path='controllers'
                element={<ControllersPage project={project} />}
              />
              <Route
                path='settings'
                element={<SettingsPage />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

function App() {
  const project = useActiveProject()

  if (E.isLeft(project)) {
    return <AppWithoutProject message={project.left} />
  } else {
    return <AppWithProject project={project.right} />
  }
}

export default App
