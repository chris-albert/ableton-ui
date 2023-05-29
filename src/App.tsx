import React from 'react';
import './styles.scss'
import {Nav} from "./Nav";
import {Body} from "./Body";
import {createTheme, ThemeProvider} from "@mui/material";
import { Provider } from 'react-redux'
import {ApplicationStore} from "./model/ApplicationStore";
import {NoMidiPage} from "./pages/NoMidiPage";
import {useMidiContext} from "./contexts/MidiContext";
import {MidiInput} from "./midi/WindowMidi";
import {NoMidiInputPage} from "./pages/NoMidiInputPage";

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

  return (
    <div className="App">
      <Provider store={ApplicationStore}>
        <ThemeProvider theme={darkTheme}>
          {midi === undefined ?
              (<NoMidiPage />):
              (<>
                <Nav
                    midi={midi}
                    onInputSelect={setMidiInput}
                />
                {midiInput === undefined ?
                    (<NoMidiInputPage />):
                    (<Body midiInput={midiInput} />)
                }
              </>)
          }
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
