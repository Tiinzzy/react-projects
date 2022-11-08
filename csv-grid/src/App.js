import './App.css';
import React from 'react';

import { getData } from './components/CsvParse';

import CsvGrid from './components/CsvGrid'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jCsv: null
    }
  }

  async componentDidMount() {
    let jCsv = await getData();
    this.setState({ jCsv });
  }

  render() {
    return (
      <>
        {this.state.jCsv !== null && <CsvGrid jCsv={this.state.jCsv} />}
      </>
    );
  }
}

export default App;


