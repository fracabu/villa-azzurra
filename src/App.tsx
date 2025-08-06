import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Calendar from './components/Calendar';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'it' | 'en'>('it');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('adminLoggedIn') === 'true'
  );

  const handleAdminLogin = (success: boolean) => {
    setIsAdminLoggedIn(success);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          isAdminLoggedIn ? 
            <AdminDashboard onLogout={handleAdminLogout} /> : 
            <AdminLogin onLogin={handleAdminLogin} />
        } />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
            <main>
              <Hero currentLanguage={currentLanguage} />
              <About currentLanguage={currentLanguage} />
              <Gallery currentLanguage={currentLanguage} />
              <Services currentLanguage={currentLanguage} />
              <Calendar currentLanguage={currentLanguage} />
              <Booking currentLanguage={currentLanguage} />
              <Reviews currentLanguage={currentLanguage} />
              <Location currentLanguage={currentLanguage} />
              <Contact currentLanguage={currentLanguage} />
            </main>
            <Footer currentLanguage={currentLanguage} />
            <CookieBanner currentLanguage={currentLanguage} />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;