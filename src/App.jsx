import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import DemografiePage from './pages/BevoelkerungPage';
import Home from './pages/Home'; // deine bestehende Startseite

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bevoelkerung" element={<BevoelkerungPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
