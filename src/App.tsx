import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import VehicleRental from './components/VehicleRental';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <VehicleRental />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;