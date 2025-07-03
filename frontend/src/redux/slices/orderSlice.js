import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import orderService from '../../services/orderService';

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  isError: false,
  message: '',
};

// Créer une nouvelle commande
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await orderService.createOrder(orderData, token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Récupérer les commandes de l'utilisateur
export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await orderService.getUserOrders(token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Récupérer une commande par ID
export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await orderService.getOrderById(orderId, token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Annuler une commande
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await orderService.cancelOrder(orderId, token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Télécharger une facture PDF
export const downloadInvoice = createAsyncThunk(
  'orders/downloadInvoice',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await orderService.downloadInvoice(orderId, token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearOrder: (state) => {
      state.order = null;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      
      // Mettre à jour dans la liste des commandes
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
      
      // Mettre à jour la commande courante si c'est la même
      if (state.order && state.order.id === orderId) {
        state.order.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order || action.payload;
        // Ajouter la nouvelle commande à la liste
        state.orders.unshift(action.payload.order || action.payload);
        toast.success('Commande créée avec succès !');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders || action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Erreur lors du chargement des commandes');
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order || action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Erreur lors du chargement de la commande');
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const cancelledOrder = action.payload.order || action.payload;
        
        // Mettre à jour dans la liste
        const orderIndex = state.orders.findIndex(order => order.id === cancelledOrder.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = cancelledOrder;
        }
        
        // Mettre à jour la commande courante
        if (state.order && state.order.id === cancelledOrder.id) {
          state.order = cancelledOrder;
        }
        
        toast.success('Commande annulée avec succès');
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Download Invoice
      .addCase(downloadInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadInvoice.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Téléchargement de la facture en cours...');
      })
      .addCase(downloadInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Erreur lors du téléchargement de la facture');
      });
  },
});

export const { reset, clearOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer; 