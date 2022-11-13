import './App.css';
import FileViewer from './components/FileViewer';
import Header from './components/Header';
import Footer from './components/Footer';


let allfiles = {

}

function fileViewer1CallBack(file) {
  alert('F1 Call Back is called');
  allfiles.f1 = file;
  console.log(allfiles);
}

function fileViewer2CallBack(file) {
  alert('F2 Call Back is called');
  allfiles.f2 = file;
  console.log(allfiles);
}

function fileViewer3CallBack(file) {
  alert('F3 Call Back is called');
  allfiles.f3 = file;
  console.log(allfiles);
}

function App() {
  return (
    <div className="App">
      <Header />
      <FileViewer id='file #1' callback={fileViewer1CallBack} />
      <FileViewer id='file #2' callback={fileViewer2CallBack} />
      <Footer />
    </div>
  );
}

export default App;
