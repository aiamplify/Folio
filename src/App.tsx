import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import MissionPage from './components/MissionPage';
import ContactPage from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onNavigate={setCurrentPage} />
      {currentPage === 'home' ? (
        <>
          <Hero />
          <Projects />
        </>
      ) : currentPage === 'projects' ? (
        <ProjectsPage />
      ) : currentPage === 'mission' ? (
        <MissionPage />
      ) : currentPage === 'contact' ? (
        <ContactPage />
      ) : null}
    </div>
  );
}

export default App;