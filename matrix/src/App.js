import Matrix from './components/Matrix';
import Grid from './components/Grid';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 25 }}>
      <Matrix />
      <Grid />
    </div>
  );
}

export default App;
