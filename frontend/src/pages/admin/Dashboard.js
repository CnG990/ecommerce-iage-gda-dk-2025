import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaShoppingBag, 
  FaChartLine, 
  FaEuroSign,
  FaBoxes,
  FaTruck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaShoppingCart
} from 'react-icons/fa';
import dashboardService from '../../services/dashboardService';
import { formatPrice } from '../../utils/formatters';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    completedOrders: 0,
    activeUsers: 0,
    dailyStats: {
      orders: { value: 0, trend: 'up', percentage: 0 },
      revenue: { value: 0, trend: 'up', percentage: 0 },
      users: { value: 0, trend: 'up', percentage: 0 },
      products: { value: 0, trend: 'up', percentage: 0 }
    }
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getDashboardStats();
        if (response.success) {
          const { data } = response;
          setStats(prevStats => ({
            ...prevStats,
            totalUsers: data.total_users,
            totalProducts: data.total_products,
            totalOrders: data.total_orders,
            totalRevenue: data.total_revenue,
            pendingOrders: data.orders_by_status.find(s => s.status === 'pending')?.count || 0,
            lowStockProducts: data.top_products.filter(p => p.stock < 10).length,
            completedOrders: data.orders_by_status.find(s => s.status === 'completed')?.count || 0,
            dailyStats: {
              orders: {
                value: data.total_orders,
                trend: data.total_orders > 0 ? 'up' : 'down',
                percentage: 12 // À calculer dynamiquement si besoin
              },
              revenue: {
                value: data.total_revenue,
                trend: data.total_revenue > 0 ? 'up' : 'down',
                percentage: 8 // À calculer dynamiquement si besoin
              },
              users: {
                value: data.total_users,
                trend: data.total_users > 0 ? 'up' : 'down',
                percentage: 3 // À calculer dynamiquement si besoin
              },
              products: {
                value: data.total_products,
                trend: data.total_products > 0 ? 'up' : 'down',
                percentage: 15 // À calculer dynamiquement si besoin
              }
            }
          }));

          // Mettre à jour les commandes récentes
          setRecentOrders(data.recent_orders.map(order => ({
            id: order.id,
            customer: `${order.user.first_name} ${order.user.last_name}`,
            amount: order.total_amount,
            status: order.status,
            date: new Date(order.created_at).toISOString().split('T')[0],
            items: order.items.length
          })));

          // Mettre à jour les produits populaires
          setTopProducts(data.top_products.map(product => ({
            name: product.name,
            sales: product.total_sold,
            revenue: product.revenue,
            stock: product.stock,
            trend: product.revenue > 10000 ? 'up' : 'down'
          })));
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données du dashboard:', err);
        setError('Impossible de charger les données du dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, trend, percentage, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && percentage && (
          <div className={`flex items-center text-${trend === 'up' ? 'green' : 'red'}-600`}>
            {trend === 'up' ? <FaArrowUp className="h-4 w-4 mr-1" /> : <FaArrowDown className="h-4 w-4 mr-1" />}
            <span className="text-sm font-medium">{percentage}%</span>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Le reste du code du composant reste inchangé...
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="mt-1 text-sm text-gray-600">
          Vue d'ensemble de votre boutique en ligne
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaShoppingCart}
          title="Commandes du jour"
          value={stats.dailyStats.orders.value}
          trend={stats.dailyStats.orders.trend}
          percentage={stats.dailyStats.orders.percentage}
          color="blue"
        />
        <StatCard
          icon={FaEuroSign}
          title="Revenus du jour"
          value={formatPrice(stats.dailyStats.revenue.value)}
          trend={stats.dailyStats.revenue.trend}
          percentage={stats.dailyStats.revenue.percentage}
          color="green"
        />
        <StatCard
          icon={FaUsers}
          title="Nouveaux clients"
          value={stats.dailyStats.users.value}
          trend={stats.dailyStats.users.trend}
          percentage={stats.dailyStats.users.percentage}
          color="purple"
        />
        <StatCard
          icon={FaBoxes}
          title="Nouveaux produits"
          value={stats.dailyStats.products.value}
          trend={stats.dailyStats.products.trend}
          percentage={stats.dailyStats.products.percentage}
          color="yellow"
        />
      </div>

      {/* Alertes et actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Alertes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    {stats.pendingOrders} commandes en attente
                  </p>
                  <p className="text-sm text-red-600">Nécessitent votre attention</p>
                </div>
                <Link
                  to="/admin/orders"
                  className="ml-auto text-sm font-medium text-red-700 hover:text-red-800"
                >
                  Voir →
                </Link>
              </div>
              <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                <FaBoxes className="h-5 w-5 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    {stats.lowStockProducts} produits en rupture
                  </p>
                  <p className="text-sm text-orange-600">Réapprovisionnement nécessaire</p>
                </div>
                <Link
                  to="/admin/products"
                  className="ml-auto text-sm font-medium text-orange-700 hover:text-orange-800"
                >
                  Voir →
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* La colonne Actions Rapides a été supprimée */}
      </div>

      {/* Commandes récentes et produits populaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Commandes Récentes</h3>
            <Link
              to="/admin/orders"
              className="text-sm font-medium text-primary-600 hover:text-primary-800"
            >
              Voir tout →
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FaShoppingCart className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.date} • {order.items} articles</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(order.amount)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Produits Populaires</h3>
            <Link
              to="/admin/products"
              className="text-sm font-medium text-primary-600 hover:text-primary-800"
            >
              Voir tout →
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FaShoppingBag className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} ventes • Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(product.revenue)}
                    </p>
                    <div className={`flex items-center text-${product.trend === 'up' ? 'green' : 'red'}-600`}>
                      {product.trend === 'up' ? <FaArrowUp className="h-3 w-3 mr-1" /> : <FaArrowDown className="h-3 w-3 mr-1" />}
                      <span className="text-xs">{product.trend === 'up' ? '+' : '-'}24%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 