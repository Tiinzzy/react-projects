import Matrix from './components/Matrix';
import Grid from './components/Grid';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '25px 15px 15px 15px' }}>
      <Matrix />
      <Grid />
    </div>
  );
}

export default App;
