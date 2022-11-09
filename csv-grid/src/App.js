import './App.css';
import React from 'react';

import { getData } from './components/CsvParse';

import CsvGrid from './components/CsvGrid'
import NumToWord from './components/NumToWord';

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
        {/* {this.state.jCsv !== null && <CsvGrid jCsv={this.state.jCsv} />} */}
        <NumToWord/>
      </>
    );
  }
}

export default App;


