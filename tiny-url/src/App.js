import React from "react";

import Game from "./components/Game";
import TinyUrl from "./components/TinyUrl";
import Box from '@mui/material/Box';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Box style={{ height: 270, marginTop: 40 }}>
          <TinyUrl />
        </Box>
        <Box style={{ marginTop: 50 }}>
          <Game />
        </Box>
      </div>
    )
  }
}

export default App;