import axios from '../config/axios';

const API_URL = '/api/products/';

// Get all products
const getAllProducts = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('ProductService - Get all products error:', error);
    throw error;
  }
};

// Get product by ID or slug
const getProduct = async (idOrSlug) => {
  try {
    const response = await axios.get(API_URL + idOrSlug);
    return response.data;
  } catch (error) {
    console.error('ProductService - Get product error:', error);
    throw error;
  }
};

// Create product (admin only)
const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('ProductService - Create product error:', error);
    throw error;
  }
};

// Update product (admin only)
const updateProduct = async (idOrSlug, productData) => {
  try {
    const response = await axios.put(API_URL + idOrSlug, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('ProductService - Update product error:', error);
    throw error;
  }
};

// Delete product (admin only)
const deleteProduct = async (idOrSlug) => {
  try {
    const response = await axios.delete(API_URL + idOrSlug);
    return response.data;
  } catch (error) {
    console.error('ProductService - Delete product error:', error);
    throw error;
  }
};

// Get featured products
const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(API_URL + 'featured');
    return response.data;
  } catch (error) {
    console.error('ProductService - Get featured products error:', error);
    throw error;
  }
};

// Search products
const searchProducts = async (query) => {
  try {
    const response = await axios.get(API_URL + 'search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('ProductService - Search products error:', error);
    throw error;
  }
};

// Get products by category
const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(API_URL + 'category/' + categoryId);
    return response.data;
  } catch (error) {
    console.error('ProductService - Get products by category error:', error);
    throw error;
  }
};

// Get similar products
const getSimilarProducts = async (productId) => {
  try {
    const response = await axios.get(API_URL + productId + '/similar');
    return response.data;
  } catch (error) {
    console.error('ProductService - Get similar products error:', error);
    throw error;
  }
};

const productService = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  searchProducts,
  getProductsByCategory,
  getSimilarProducts,
};

export default productService; 