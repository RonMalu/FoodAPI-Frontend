import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">FoodMenu</span>
          </Link>
          <nav className="nav">
            <Link 
              to="/categories" 
              className={`nav-link ${location.pathname.includes('categories') ? 'active' : ''}`}
            >
              CATEGORIES
            </Link>
            <Link 
              to="/menu-items" 
              className={`nav-link ${location.pathname === '/menu-items' ? 'active' : ''}`}
            >
              MENU ITEMS
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
