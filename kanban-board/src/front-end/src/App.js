import React, { useState } from 'react';
import MainHome from "./components/MainHome";

import KanbanContext from './KanbanContext';


function App() {
  const callback = (msg) => {
    console.log(msg);
  }

  const [context, setContect] = useState({ counter: 0, callback: callback });

  return (
    <KanbanContext.Provider value={context}>
      <div onClick={() => setContect({ counter: context.counter + 1 })} id="test">HERE</div>
      <MainHome />
    </KanbanContext.Provider>
  );
}

export default App;
