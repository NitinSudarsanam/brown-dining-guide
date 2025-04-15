'use client';
import React, { useState } from 'react';
import './menus.css';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const DIETARY_DATA = {
  kosher: {
    title: "Kosher Recommendations",
    description: "Kosher dining options adhering to Jewish dietary laws",
    icon: "✡️",
    color: "#3498db"
  },
  vegetarian: {
    title: "Vegetarian Recommendations",
    description: "Meat-free options rich in nutrients and flavor",
    icon: "🥗",
    color: "#2ecc71"
  },
  vegan: {
    title: "Vegan Recommendations",
    description: "Plant-based options free from animal products",
    icon: "🌱",
    color: "#27ae60"
  },
  pescetarian: {
    title: "Pescetarian Recommendations",
    description: "Vegetarian diet with the addition of seafood",
    icon: "🐟",
    color: "#1abc9c"
  },
  paleo: {
    title: "Paleo Recommendations",
    description: "Whole foods emphasizing meats, nuts, and produce",
    icon: "🥩",
    color: "#e67e22"
  },
  gluten_free: {
    title: "Gluten-Free Recommendations",
    description: "Options without wheat, barley, rye, or other gluten sources",
    icon: "🌾",
    color: "#f1c40f"
  },
  carnivore: {
    title: "Carnivore Recommendations",
    description: "Protein-rich options featuring various meats",
    icon: "🥓",
    color: "#d35400"
  },
  halal: {
    title: "Halal Recommendations",
    description: "Options prepared according to Islamic dietary guidelines",
    icon: "☪️",
    color: "#9b59b6"
  }
};

interface DietarySectionProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  items: Array<{
    title: string;
    link: string;
  }>;
}

const DietarySection: React.FC<DietarySectionProps> = ({ title, description, icon, color, items }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`dietary-section ${expanded ? 'expanded' : ''}`} style={{ borderColor: color }}>
      <div className="section-header" onClick={() => setExpanded(!expanded)}>
        <div className="header-content">
          <div className="icon-container" style={{ backgroundColor: color }}>
            <span className="section-icon">{icon}</span>
          </div>
          <div className="header-text">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className={`expand-icon ${expanded ? 'expanded' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="section-content">
        <ul className="menu-links">
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link}>
                {item.title}
                <span className="arrow">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MenusPage: React.FC = () => {
  const dietarySections = Object.entries(DIETARY_DATA).map(([key, value]) => ({
    title: `${value.title.split(' ')[0]} Section`,
    description: value.description,
    icon: value.icon,
    color: value.color,
    items: [
      { title: "Recommendations for the next week", link: `/dietary/${key}` },
      { title: `Best ${key.replace('_', '-')} meals`, link: `/dietary/${key}` },
      { title: `Food Hack: ${value.title}`, link: `/dietary/${key}` }
    ]
  }));

  return (
    <div className="menus-page">
      <NavigationBar />
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Specialized Menus</h1>
          <p>Explore our diverse dining options tailored to your dietary preferences</p>
        </div>
      </div>
      <div className="page-content">
        <div className="intro-text">
          <h2>Choose Your Dietary Preference</h2>
          <p>
            Brown University Dining Services takes pride in offering a wide variety of options 
            for all dietary needs and preferences. Click on any section below to explore 
            recommendations, popular dishes, and special features for your dietary choice.
          </p>
        </div>
        <div className="dietary-sections">
          {dietarySections.map((section, index) => (
            <DietarySection
              key={index}
              title={section.title}
              description={section.description}
              icon={section.icon}
              color={section.color}
              items={section.items}
            />
          ))}
        </div>
        <div className="special-note">
          <h3>Can't find what you're looking for?</h3>
          <p>
            Our dietitian is available for personalized consultations to help you navigate 
            our dining options based on your unique needs. Schedule a consultation by emailing 
            <a href="mailto:aditya_patel@brown.edu"> aditya_patel@brown.edu</a>.
          </p>
        </div>
      </div>
      <footer className="footer">
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

export default MenusPage;
