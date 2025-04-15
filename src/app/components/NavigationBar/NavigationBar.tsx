import React, { useState } from 'react';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="logo">
          <a href="/">The Brown Dining Guide</a>
        </div>
        
        <div className={`mobile-menu-button ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/dining-halls">Dining Halls</a></li>
          <li><a href="/menus">Menus</a></li>
          <li><a href="/hours">Hours</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        
        <div className="book-now">
          <a href="/book" className="book-now-btn">BOOK NOW</a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;