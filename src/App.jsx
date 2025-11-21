import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import MenuItems from './pages/MenuItems';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<CategoryDetail />} />
        <Route path="menu-items" element={<MenuItems />} />
      </Route>
    </Routes>
  );
}

export default App;
