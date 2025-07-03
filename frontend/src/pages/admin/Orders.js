import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort, FaEye, FaDownload, FaTruck, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatPrice } from '../../utils/formatters';
import orderService from '../../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0
  });
  const [stats, setStats] = useState({
    pending: 0,
    processing: 0,
    delivered: 0,
    total: 0
  });

  const statuses = ['Tous', 'En attente', 'En cours', 'Livré', 'Annulé'];

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      
      if (response?.data?.success && response?.data?.data) {
        // Handle paginated data structure
        const paginatedData = response.data.data;
        setOrders(paginatedData.data || []); // Laravel pagination puts items in data property
        setPagination({
          currentPage: paginatedData.current_page,
          lastPage: paginatedData.last_page,
          perPage: paginatedData.per_page,
          total: paginatedData.total
        });
      } else {
        setOrders([]);
        console.error('Unexpected API response structure:', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      toast.error('Erreur lors du chargement des commandes');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await orderService.getOrderStats();
      if (response?.data?.success && response?.data?.data) {
        const statsData = response.data.data;
        setStats({
          pending: statsData.status_counts?.pending || 0,
          processing: statsData.status_counts?.processing || 0,
          delivered: statsData.status_counts?.delivered || 0,
          total: statsData.total_revenue || 0
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      toast.error('Erreur lors du chargement des statistiques');
    }
  };

  // Only proceed with filtering if orders is actually an array
  const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
    const matchesSearch = 
      (order.customer?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.id?.toString() || '').includes(searchTerm);
    const matchesStatus = statusFilter === '' || statusFilter === 'Tous' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) : [];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success('Statut de la commande mis à jour');
      fetchOrders();
      fetchStats();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      try {
        await orderService.deleteOrder(orderId);
        toast.success('Commande supprimée avec succès');
        fetchOrders();
        fetchStats();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de la commande');
      }
    }
  };

  const handleDownloadInvoice = async (orderId) => {
    try {
      const response = await orderService.generateInvoice(orderId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `facture-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement de la facture:', error);
      toast.error('Erreur lors du téléchargement de la facture');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'Livré':
        return 'bg-green-100 text-green-800';
      case 'Annulé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Commandes</h1>
          <p className="text-gray-600 mt-2">
            Suivez et gérez toutes les commandes de vos clients
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FaTruck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaTruck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.processing}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaCheck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Livrées</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.delivered}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaTruck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{formatPrice(stats.total)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une commande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="text-right">
                <span className="text-sm text-gray-600">
                  {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} trouvée{filteredOrders.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paiement
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items_count} article{order.items_count > 1 ? 's' : ''}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.payment_method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Télécharger la facture"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, order.status === 'En attente' ? 'En cours' : 'Livré')}
                          className={`${
                            order.status === 'En attente'
                              ? 'text-yellow-600 hover:text-yellow-900'
                              : order.status === 'En cours'
                              ? 'text-blue-600 hover:text-blue-900'
                              : 'text-green-600 hover:text-green-900'
                          }`}
                          title="Changer le statut"
                        >
                          {order.status === 'En attente' ? <FaTruck /> : order.status === 'En cours' ? <FaCheck /> : <FaCheck />}
                        </button>
                        {order.status === 'En attente' && (
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Annuler la commande"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  };
  
export default AdminOrders; 