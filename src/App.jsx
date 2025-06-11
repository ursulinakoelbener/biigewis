import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home'; // deine bestehende Startseite
import Bevoelkerung from './pages/Bevoelkerung';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bevoelkerung" element={<Bevoelkerung />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
