import React from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";


export function appCallBack(file) {
  console.log('>>>> APP.js >> appCallBack');
  console.log(file);
}

function callback(file) {
  console.log('>>>> APP.js');
  console.log(file);
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Header />
        <Home callback={callback} />
        <Footer />
      </>
    );
  }
}
export default App;
