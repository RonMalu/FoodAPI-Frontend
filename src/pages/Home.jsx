import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            YOUR DIGITAL
            <br />
            <span className="hero-title-accent">COOKBOOK</span>
          </h1>
          <p className="hero-subtitle">
            ORGANIZE. CREATE. DEVOUR.
          </p>
          <div className="hero-actions">
            <Link to="/categories" className="hero-btn hero-btn-primary">
              BROWSE CATEGORIES
            </Link>
            <Link to="/menu-items" className="hero-btn hero-btn-secondary">
              VIEW ALL ITEMS
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-block block-1">
            <span className="block-emoji">🍕</span>
          </div>
          <div className="visual-block block-2">
            <span className="block-emoji">🍔</span>
          </div>
          <div className="visual-block block-3">
            <span className="block-emoji">🍜</span>
          </div>
          <div className="visual-block block-4">
            <span className="block-emoji">🥗</span>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">ORGANIZE</h3>
          <p className="feature-text">
            Sort your recipes into categories for easy access
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3 className="feature-title">CREATE</h3>
          <p className="feature-text">
            Add new menu items and categories on the fly
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3 className="feature-title">TRACK</h3>
          <p className="feature-text">
            Keep track of prices and menu details
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
