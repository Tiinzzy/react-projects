import MainHome from "./components/MainHome";

import ReactDOM from 'react-dom';

function App() {
  return (
    <>
      <div id="test"></div>
      {/* <MainHome /> */}
      {ReactDOM.createPortal(<h1>CHILD</h1>, document.body)}
    </>
  );
}

export default App;
