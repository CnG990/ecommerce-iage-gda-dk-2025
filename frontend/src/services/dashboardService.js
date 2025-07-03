import axios from '../config/axios';

const API_URL = '/api/admin/';

// Get dashboard statistics
const getDashboardStats = async () => {
  try {
    const response = await axios.get(API_URL + 'dashboard');
    return response.data;
  } catch (error) {
    console.error('DashboardService - Get stats error:', error);
    throw error;
  }
};

const dashboardService = {
  getDashboardStats,
};

export default dashboardService; 