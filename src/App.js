import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import BooksSection from './components/BooksSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
      <BooksSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default App;