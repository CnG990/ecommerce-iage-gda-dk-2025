import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

// Fonction sécurisée pour récupérer l'utilisateur du localStorage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

// Fonction sécurisée pour récupérer le token du localStorage
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      console.log('Register response:', response);
      
      if (response.success && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Register error:', error);
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      console.log('Login response:', response);
      
      if (response.success && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await authService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log('Register fulfilled - User:', action.payload.user);
        console.log('Register fulfilled - Token:', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        console.error('Register rejected:', action.payload);
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log('Login fulfilled - User:', action.payload.user);
        console.log('Login fulfilled - Token:', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        console.error('Login rejected:', action.payload);
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer; 