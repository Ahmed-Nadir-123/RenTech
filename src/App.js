import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home.js";
import Login from "./components/login.js";
import Signup from "./components/signup.js";
import Offices from "./components/offices.js";
import Infos from "./components/inofs.js";
import ViewVehicle from "./components/viewvehicle.js";
import Profile from "./components/profile.js";
import OwnerDashboard from "./components/owner-dashboard.js";
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/infos" element={<Infos />} />
          <Route path="/vehicles/:ownerId" element={<ViewVehicle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;