import axios from '../config/axios';

const API_URL = '/api/categories/';

// Get all categories
const getAllCategories = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('CategoryService - Get all categories error:', error);
    throw error;
  }
};

// Get category by ID
const getCategory = async (id) => {
  try {
    const response = await axios.get(API_URL + id);
    return response.data;
  } catch (error) {
    console.error('CategoryService - Get category error:', error);
    throw error;
  }
};

// Create category (admin only)
const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    console.error('CategoryService - Create category error:', error);
    throw error;
  }
};

// Update category (admin only)
const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(API_URL + id, categoryData);
    return response.data;
  } catch (error) {
    console.error('CategoryService - Update category error:', error);
    throw error;
  }
};

// Delete category (admin only)
const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(API_URL + id);
    return response.data;
  } catch (error) {
    console.error('CategoryService - Delete category error:', error);
    throw error;
  }
};

const categoryService = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService; 