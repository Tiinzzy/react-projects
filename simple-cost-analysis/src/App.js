import React from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

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
        <Home />
        <Footer />
      </>
    );
  }
}
export default App;
