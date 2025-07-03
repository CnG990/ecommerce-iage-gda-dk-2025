import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { 
  FaTachometerAlt, 
  FaShoppingBag, 
  FaUsers, 
  FaChartLine, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStore,
  FaBell,
  FaUserCircle
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigation = [
    { name: 'Tableau de Bord', href: '/admin', icon: FaTachometerAlt },
    { name: 'Produits', href: '/admin/products', icon: FaShoppingBag },
    { name: 'Commandes', href: '/admin/orders', icon: FaChartLine },
    { name: 'Utilisateurs', href: '/admin/users', icon: FaUsers },
    { name: 'Paramètres', href: '/admin/settings', icon: FaCog },
  ];

  const notifications = [
    { id: 1, text: 'Nouvelle commande #1234', time: 'Il y a 5 min' },
    { id: 2, text: 'Stock faible pour "iPhone 13"', time: 'Il y a 30 min' },
    { id: 3, text: '3 nouveaux utilisateurs inscrits', time: 'Il y a 1h' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none lg:relative ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 bg-primary-600">
          <div className="flex items-center">
            <FaStore className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)]">
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`mr-3 h-5 w-5 ${
                    isActive(item.href) ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <FaUserCircle className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'Administrateur'}
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-3 h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FaBars className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <FaBell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="text-sm font-medium">
                    {user?.name || 'Administrateur'}
                  </span>
                  <FaUserCircle className="h-8 w-8 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profil
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Paramètres
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>

              <Link
                to="/"
                className="hidden sm:block text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Voir le site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 