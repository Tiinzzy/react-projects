import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '65%' }}>
          <Home />
        </div>
      </div>
    </>

  );
}

export default App;
