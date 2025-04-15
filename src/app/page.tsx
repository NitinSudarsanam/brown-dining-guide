'use client'
import React from 'react';
import './BrownDiningGuide.css';
import NavigationBar from './components/NavigationBar/NavigationBar';

const BrownDiningGuide: React.FC = () => {
  return (
    <div className="dining-guide">
      <NavigationBar />

      <section className="hero-section">
        <div className="hero-image">
          <div className="hero-overlay">
            <h2 className="hero-title">Making Dining Easier for You!</h2>
          </div>
        </div>
      </section>

      <section className="recommendations-section">
        <h2 className="section-title">Our Dining Recommendations for April 2025</h2>
        <div className="food-grid">
          <div className="food-item">
            <img src="/api/placeholder/400/400" alt="Yellow tomatoes stacked in a pyramid" />
            <div className="food-caption">
              <h3>Seasonal Tomatoes</h3>
              <p>Ratty Dining Hall</p>
            </div>
          </div>
          <div className="food-item">
            <img src="/api/placeholder/400/400" alt="White cheese blocks stacked" />
            <div className="food-caption">
              <h3>Artisan Cheese</h3>
              <p>Andrews Commons</p>
            </div>
          </div>
          <div className="food-item">
            <img src="/api/placeholder/400/400" alt="Sliced artisan bread loaf" />
            <div className="food-caption">
              <h3>Fresh Bakery</h3>
              <p>Blue Room</p>
            </div>
          </div>
          <div className="food-item">
            <img src="/api/placeholder/400/400" alt="Red cherry tomatoes" />
            <div className="food-caption">
              <h3>Cherry Tomatoes</h3>
              <p>Verney-Woolley</p>
            </div>
          </div>
        </div>
      </section>

      <section className="campus-dining-info">
        <div className="info-container">
          <div className="info-text">
            <h2>Brown University Dining Services</h2>
            <p>Explore dining options across campus, from our main dining halls to cafés and late-night eateries. Brown Dining Services is committed to providing delicious, nutritious, and sustainable food options for our community.</p>
            <a href="/dining-halls" className="learn-more-btn">LEARN MORE</a>
          </div>
          <div className="info-image">
            <img src="/api/placeholder/500/300" alt="Brown University dining hall" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="social-button-container">
            <button className="social-button">SOCIAL</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Brown University Dining Services</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrownDiningGuide;