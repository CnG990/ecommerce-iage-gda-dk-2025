import axios from '../config/axios';

const API_URL = '/api/';
const ADMIN_URL = '/api/admin/';

// Get user profile
const getProfile = async () => {
  try {
    const response = await axios.get(API_URL + 'auth/profile');
    return response.data;
  } catch (error) {
    console.error('UserService - Get profile error:', error);
    throw error;
  }
};

// Update user profile
const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(API_URL + 'auth/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('UserService - Update profile error:', error);
    throw error;
  }
};

// Change password
const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(API_URL + 'auth/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('UserService - Change password error:', error);
    throw error;
  }
};

// Get all users (admin)
const getAllUsers = async (params = {}) => {
  try {
    const response = await axios.get(ADMIN_URL + 'users', { 
      params: {
        page: params.page || 1,
        limit: params.limit || 15,
        search: params.search,
        role: params.role,
        status: params.status
      }
    });
    return response.data;
  } catch (error) {
    console.error('UserService - Get all users error:', error);
    throw error;
  }
};

// Delete user (admin)
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${ADMIN_URL}users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('UserService - Delete user error:', error);
    throw error;
  }
};

// Update user status (admin)
const updateUserStatus = async (userId, status) => {
  try {
    const response = await axios.put(`${ADMIN_URL}users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('UserService - Update user status error:', error);
    throw error;
  }
};

// Update user (admin)
const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${ADMIN_URL}users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('UserService - Update user error:', error);
    throw error;
  }
};

const userService = {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteUser,
  updateUserStatus,
  updateUser,
};

export default userService; 