import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

// Fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params = {}, thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories(params);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get category by ID
export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.getCategory(id);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, thunkAPI) => {
    try {
      const response = await categoryService.createCategory(categoryData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await categoryService.updateCategory(id, data);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.deleteCategory(id);
      return { id, ...response };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearCategory: (state) => {
      state.category = null;
      state.error = null;
      state.success = false;
    },
    resetState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.success = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Category By ID
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
        state.success = true;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
        state.success = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(c => c.id === action.payload.data.id);
        if (index !== -1) {
          state.categories[index] = action.payload.data;
        }
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(c => c.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCategory, resetState } = categorySlice.actions;

export default categorySlice.reducer; 