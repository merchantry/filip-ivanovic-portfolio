import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './components/Background';
import Content from './components/Content';
import LargeNavbar from './components/LargeNavbar';
import TopCurve from './components/TopCurve';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Background />
      <TopCurve />
      <LargeNavbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
