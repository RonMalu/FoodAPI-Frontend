import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuItems.css';

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:3000/menu_items'),
        axios.get('http://localhost:3000/categories')
      ]);
      setMenuItems(itemsResponse.data);
      setCategories(categoriesResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/menu_items', {
        ...formData,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id)
      });
      setFormData({ name: '', price: '', category_id: '' });
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert('Failed to create menu item');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-box">LOADING...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">{error}</div>
      </div>
    );
  }

  return (
    <div className="menu-items-page">
      <div className="page-header">
        <h1 className="page-title">MENU ITEMS</h1>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'CANCEL' : '+ ADD ITEM'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="menu-item-form">
            <div className="form-group">
              <label className="form-label">ITEM NAME</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter item name..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">PRICE</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label className="form-label">CATEGORY</label>
              <select
                className="form-input"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                required
              >
                <option value="">Select a category...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'CREATING...' : 'CREATE ITEM'}
            </button>
          </form>
        </div>
      )}

      <div className="menu-items-list">
        {menuItems.map((item, index) => (
          <div 
            key={item.id}
            className="menu-item-card"
            style={{
              backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#00F0FF'
            }}
          >
            <div className="item-header">
              <h3 className="item-name">{item.name}</h3>
              <div className="item-price">${parseFloat(item.price).toFixed(2)}</div>
            </div>
            <div className="item-category">
              <span className="category-badge">
                {getCategoryName(item.category_id)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p className="empty-text">NO MENU ITEMS YET</p>
          <p className="empty-subtext">Create your first menu item to get started</p>
        </div>
      )}
    </div>
  );
}

export default MenuItems;
