import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Récupérer le panier depuis localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return [];
  }
};

// Sauvegarder le panier dans localStorage
const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du panier:', error);
  }
};

const initialState = {
  items: getCartFromStorage(),
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: false,
  promoCode: null,
};

// Calculer les totaux
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, stock } = action.payload;
      
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity < stock) {
          existingItem.quantity += 1;
          toast.success(`Quantité mise à jour pour ${name}`);
        } else {
          toast.warning('Stock insuffisant');
          return;
        }
      } else {
        if (stock > 0) {
          state.items.push({
            id,
            name,
            price,
            image,
            quantity: 1,
            stock
          });
          toast.success(`${name} ajouté au panier`);
        } else {
          toast.warning('Produit en rupture de stock');
          return;
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      
      saveCartToStorage(state.items);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find(item => item.id === itemId);
      
      if (itemToRemove) {
        state.items = state.items.filter(item => item.id !== itemId);
        toast.info(`${itemToRemove.name} retiré du panier`);
        
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
        
        saveCartToStorage(state.items);
      }
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          // Si la quantité est 0 ou négative, supprimer l'article
          state.items = state.items.filter(item => item.id !== id);
          toast.info(`${item.name} retiré du panier`);
        } else if (quantity <= item.stock) {
          item.quantity = quantity;
          toast.success('Quantité mise à jour');
        } else {
          toast.warning('Stock insuffisant');
          return;
        }
        
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
        
        saveCartToStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      localStorage.removeItem('cart');
      toast.info('Panier vidé');
    },
    
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
        
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
        
        saveCartToStorage(state.items);
      } else {
        toast.warning('Stock insuffisant');
      }
    },
    
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          
          const totals = calculateTotals(state.items);
          state.totalQuantity = totals.totalQuantity;
          state.totalAmount = totals.totalAmount;
          
          saveCartToStorage(state.items);
        } else {
          // Si la quantité est 1, supprimer l'article
          state.items = state.items.filter(item => item.id !== itemId);
          toast.info(`${item.name} retiré du panier`);
          
          const totals = calculateTotals(state.items);
          state.totalQuantity = totals.totalQuantity;
          state.totalAmount = totals.totalAmount;
          
          saveCartToStorage(state.items);
        }
      }
    },
    
    // Synchroniser le panier avec le stock des produits
    syncCartWithStock: (state, action) => {
      const products = action.payload;
      let cartUpdated = false;
      
      state.items = state.items.map(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          const updatedItem = { ...item, stock: product.stock };
          
          // Si la quantité dans le panier dépasse le stock disponible
          if (item.quantity > product.stock) {
            updatedItem.quantity = product.stock;
            cartUpdated = true;
            
            if (product.stock === 0) {
              toast.warning(`${item.name} n'est plus en stock et a été retiré du panier`);
              return null; // Sera filtré plus bas
            } else {
              toast.warning(`Quantité de ${item.name} réduite selon le stock disponible`);
            }
          }
          
          return updatedItem;
        }
        return item;
      }).filter(Boolean); // Supprimer les articles null
      
      if (cartUpdated) {
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
        
        saveCartToStorage(state.items);
      }
    },
    
    // Initialiser les totaux au chargement
    initializeCart: (state) => {
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    
    // Appliquer un code promo
    applyPromoCode: (state, action) => {
      const { code, discount } = action.payload;
      state.promoCode = { code, discount };
    },
    
    // Retirer un code promo
    removePromoCode: (state) => {
      state.promoCode = null;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  syncCartWithStock,
  initializeCart,
  applyPromoCode,
  removePromoCode
} = cartSlice.actions;

export default cartSlice.reducer; 