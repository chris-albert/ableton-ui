import React from 'react';
import './styles.scss'
import {Nav} from "./Nav";
import {Body} from "./Body";
import {createTheme, ThemeProvider} from "@mui/material";
import { Provider } from 'react-redux'
import {ApplicationStore} from "./model/ApplicationStore";
import {MidiComponent} from "./components/MidiComponent";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <div className="App">
      <Provider store={ApplicationStore}>
        <ThemeProvider theme={darkTheme}>
          <Nav />
          <Body />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
