import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderService from '../services/orderService';
import { formatPrice } from '../utils/formatters';

const MyOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await orderService.getMyOrders();
        setOrders(response.data?.data || []);
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veuillez vous connecter pour voir vos commandes.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-primary-600 mb-6 text-center">Mes Commandes</h1>
        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">Aucune commande trouvée.</div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-800">Commande #{order.id}</span>
                    <span className="ml-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{order.status}</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="text-gray-700 mb-2 md:mb-0">
                    <span className="font-medium">Total :</span> {formatPrice(order.total)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {order.items && order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                        <img src={item.product?.image_url || '/placeholder.png'} alt={item.product?.name} className="w-8 h-8 object-cover rounded" />
                        <span className="text-sm">{item.product?.name} x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders; 