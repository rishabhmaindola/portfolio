import React, { useRef } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Blog from './blog/Blog';
import Home from './home/Home';
import BlogDetail from './blogdetail/BlogDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <Toaster />
      <Navbar scrollToSection={scrollToSection} refs={{ skillsRef, projectsRef }} />
      <Routes>
        <Route path="/" element={<Home refs={{ skillsRef, projectsRef }} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
