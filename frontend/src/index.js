import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import store from './redux/store';

// Pages
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import AdminRoute from './components/auth/AdminRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Settings from './pages/Settings';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:slug', element: <ProductDetail /> },  // Utiliser slug au lieu de id
      { 
        path: 'cart', 
        element: <PrivateRoute><Cart /></PrivateRoute> 
      },
      { 
        path: 'checkout', 
        element: <PrivateRoute><Checkout /></PrivateRoute> 
      },
      { 
        path: 'settings', 
        element: <PrivateRoute><Settings /></PrivateRoute> 
      },
      { 
        path: 'profile', 
        element: <PrivateRoute><Profile /></PrivateRoute> 
      },
      { 
        path: 'orders', 
        element: <PrivateRoute><MyOrders /></PrivateRoute> 
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'conditions-utilisation', element: <TermsOfService /> },
      { path: 'politique-confidentialite', element: <PrivacyPolicy /> },
      {
        path: 'admin',
        element: <AdminRoute><AdminLayout /></AdminRoute>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'products', element: <AdminProducts /> },
          { path: 'orders', element: <AdminOrders /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'settings', element: <AdminSettings /> }
        ]
      }
    ]
  }
], {
  future: {
    v7_startTransition: true
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  </React.StrictMode>
); 