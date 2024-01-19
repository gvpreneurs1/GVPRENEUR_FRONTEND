import logo from './logo.svg';
import './App.css';
import First from './First';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home1 from './Visiting/Visit-Tankaman/Home1';
import Video1 from './Visiting/Visit-Tankaman/Video1';
import About1 from './Visiting/Visit-Tankaman/About1';
import Login from './views/Login';
import Register from './views/Register';

function Home() {
  return (
    <main>
      {/* <Header /> */}
      <Navbar />
      <First />
    </main>
  )
}

function Tankaman() {
  return (
    <main>
      <Home1 />
      <About1 />
      <Video1 />
    </main>
  )
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
    </Routes>
  );
}

export default App;
