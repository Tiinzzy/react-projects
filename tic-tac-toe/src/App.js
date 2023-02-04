import Game from './components/Game';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center',
      marginTop: 200
    }}>
      {/* <Game /> */}
      <TicTacToe />
    </div>
  );
}

export default App;
