import axios from 'axios';

const API_URL = '/api/auth/';

// Register user
const register = async (userData) => {
  try {
    console.log('AuthService - Register attempt with:', userData);
    const response = await axios.post(API_URL + 'register', userData);
    console.log('AuthService - Register response:', response.data);
    
    // Store the token if registration is successful
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('AuthService - Register error:', error.response?.data || error);
    throw error;
  }
};

// Login user
const login = async (userData) => {
  try {
    console.log('AuthService - Login attempt with:', userData);
    const response = await axios.post(API_URL + 'login', userData);
    console.log('AuthService - Login response:', response.data);
    
    // Store the token if login is successful
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('AuthService - Login error:', error.response?.data || error);
    throw error;
  }
};

// Logout user
const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(API_URL + 'logout', {}, config);
    }
    // Remove token from localStorage
    localStorage.removeItem('token');
  } catch (error) {
    console.error('AuthService - Logout error:', error);
    // Remove token even if logout fails
    localStorage.removeItem('token');
    throw error;
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.get(API_URL + 'user', config);
    return response.data;
  } catch (error) {
    console.error('AuthService - Get current user error:', error);
    // Remove invalid token
    localStorage.removeItem('token');
    throw error;
  }
};

// Update user profile
const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(API_URL + 'update-profile', profileData, config);
    return response.data;
  } catch (error) {
    console.error('AuthService - Update profile error:', error);
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
};

export default authService; 