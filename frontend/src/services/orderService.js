import axios from '../config/axios';

const API_URL = '/api/orders/';

// Get all orders (admin)
const getAllOrders = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response;
  } catch (error) {
    console.error('OrderService - Get all orders error:', error);
    throw error;
  }
};

// Get order details
const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}${orderId}`);
    return response.data;
  } catch (error) {
    console.error('OrderService - Get order details error:', error);
    throw error;
  }
};

// Update order status
const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('OrderService - Update order status error:', error);
    throw error;
  }
};

// Delete order
const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}${orderId}`);
    return response.data;
  } catch (error) {
    console.error('OrderService - Delete order error:', error);
    throw error;
  }
};

// Get order statistics
const getOrderStats = async () => {
  try {
    const response = await axios.get(`${API_URL}stats`);
    return response;
  } catch (error) {
    console.error('OrderService - Get order stats error:', error);
    throw error;
  }
};

// Generate order invoice
const generateInvoice = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}${orderId}/invoice`, {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error('OrderService - Generate invoice error:', error);
    throw error;
  }
};

const orderService = {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  deleteOrder,
  getOrderStats,
  generateInvoice,
};

export default orderService; 