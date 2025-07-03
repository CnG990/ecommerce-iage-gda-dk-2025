import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}, thunkAPI) => {
    try {
      const response = await productService.getAllProducts(filters);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productIdOrSlug, thunkAPI) => {
    try {
      const response = await productService.getProduct(productIdOrSlug);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await productService.createProduct(productData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await productService.updateProduct(id, data);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(id);
      return { id, ...response };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    product: null,
    categories: [],
    loading: false,
    error: null,
    success: false,
    filters: {
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sortBy: '',
      inStock: false
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 12
    }
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
      state.success = false;
    },
    resetState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        minPrice: '',
        maxPrice: '',
        search: '',
        sortBy: '',
        inStock: false
      };
      state.filteredProducts = state.products;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    applyFilters: (state) => {
      state.pagination.currentPage = 1;
      state.filteredProducts = state.products.filter(product => {
        const matchesCategory = !state.filters.category || 
          (product.category && product.category.id.toString() === state.filters.category);
        const matchesSearch = !state.filters.search || 
          product.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          product.description.toLowerCase().includes(state.filters.search.toLowerCase());
        const matchesPrice = (!state.filters.minPrice || product.price >= state.filters.minPrice) &&
          (!state.filters.maxPrice || product.price <= state.filters.maxPrice);
        const matchesStock = !state.filters.inStock || product.stock > 0;

        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      });

      // Tri
      if (state.filters.sortBy) {
        state.filteredProducts.sort((a, b) => {
          switch (state.filters.sortBy) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'newest':
              return new Date(b.created_at) - new Date(a.created_at);
            default:
              return a.name.localeCompare(b.name);
          }
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products with filters
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data?.data || [];
        state.filteredProducts = action.payload.data?.data || [];
        state.pagination.totalPages = Math.ceil((action.payload.data?.total || 0) / state.pagination.itemsPerPage);
        state.success = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.filteredProducts = [];
      })
      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.success = true;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.data);
        state.filteredProducts.push(action.payload.data); // Also update filtered products
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.products[index] = action.payload.data;
          state.filteredProducts[index] = action.payload.data; // Also update filtered products
        }
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload.id);
        state.filteredProducts = state.filteredProducts.filter(p => p.id !== action.payload.id); // Also update filtered products
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearProduct, 
  resetState, 
  setFilters, 
  clearFilters, 
  setCurrentPage, 
  applyFilters 
} = productSlice.actions;

export default productSlice.reducer; 