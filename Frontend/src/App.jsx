import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import Users from './components/Persone';
import Progetti from './components/Progetti';
import Wps from './components/Wps';
import About from './components/About';

const App = () => {
  return (
    <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persone" element={<Users />} />
          <Route path="/progetti" element={<Progetti />} />
          <Route path="/wps" element={<Wps />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  );
};

export default App;