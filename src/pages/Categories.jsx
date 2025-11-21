import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/categories', formData);
      setFormData({ name: '' });
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      alert('Failed to create category');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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
    <div className="categories-page">
      <div className="page-header">
        <h1 className="page-title">CATEGORIES</h1>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'CANCEL' : '+ ADD CATEGORY'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label className="form-label">CATEGORY NAME</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                required
                placeholder="Enter category name..."
              />
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'CREATING...' : 'CREATE CATEGORY'}
            </button>
          </form>
        </div>
      )}

      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link 
            to={`/categories/${category.id}`} 
            key={category.id}
            className="category-card"
            style={{
              backgroundColor: index % 3 === 0 ? '#FF005C' : index % 3 === 1 ? '#00F0FF' : '#FFFFFF',
              color: index % 3 === 0 ? '#FFFFFF' : '#000000'
            }}
          >
            <div className="category-icon">
              {index % 4 === 0 ? '🍕' : index % 4 === 1 ? '🍔' : index % 4 === 2 ? '🍜' : '🥗'}
            </div>
            <h3 className="category-name">{category.name}</h3>
            <div className="category-arrow">→</div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p className="empty-text">NO CATEGORIES YET</p>
          <p className="empty-subtext">Create your first category to get started</p>
        </div>
      )}
    </div>
  );
}

export default Categories;
