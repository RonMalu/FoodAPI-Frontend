import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryDetail.css';

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/categories/${id}`);
      setCategory(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load category');
      console.error(err);
    } finally {
      setLoading(false);
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
    <div className="category-detail-page">
      <Link to="/categories" className="back-link">
        ← BACK TO CATEGORIES
      </Link>

      <div className="category-header">
        <h1 className="category-title">{category.name}</h1>
      </div>

      <div className="category-info">
        <div className="info-card">
          <div className="info-label">CATEGORY ID</div>
          <div className="info-value">{category.id}</div>
        </div>
        <div className="info-card">
          <div className="info-label">CREATED</div>
          <div className="info-value">
            {new Date(category.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;
