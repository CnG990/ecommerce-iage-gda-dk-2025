import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSort, FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../redux/slices/productSlice';
import { fetchCategories } from '../../redux/slices/categorySlice';
import EditProductModal from '../../components/admin/EditProductModal';
import { formatPrice } from '../../utils/formatters';
import { getImageUrl } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Get categories from Redux state
  const { categories: categoryList = [] } = useSelector((state) => state.categories || {});
  
  // Create categories array for filter dropdown
  const categories = ['Toutes', ...(Array.isArray(categoryList) ? categoryList.map(cat => {
    // Safety check: ensure cat is an object with a name property
    if (cat && typeof cat === 'object' && cat.name) {
      return cat.name;
    }
    console.warn('Invalid category object:', cat);
    return 'Catégorie inconnue';
  }) : [])];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortProducts = (productsToSort) => {
    if (!sortConfig.key) return productsToSort;

    return [...productsToSort].sort((a, b) => {
      if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortConfig.key === 'stock') {
        return sortConfig.direction === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      }
      if (sortConfig.key === 'category') {
        const aCategory = a.category ? a.category.name : '';
        const bCategory = b.category ? b.category.name : '';
        if (aCategory < bCategory) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aCategory > bCategory) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredProducts = Array.isArray(products) ? sortProducts(products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Toutes' || 
      (product.category && product.category.name === selectedCategory);
    return matchesSearch && matchesCategory;
  })) : [];

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowEditModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      await dispatch(deleteProduct(id));
      dispatch(fetchProducts());
    }
  };

  const handleSaveProduct = async (formData) => {
    if (selectedProduct) {
      await dispatch(updateProduct({ id: selectedProduct.id, data: formData }));
    } else {
      await dispatch(createProduct(formData));
    }
    dispatch(fetchProducts());
    setShowEditModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rupture':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Faible stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProductStatus = (stock) => {
    if (stock <= 0) return 'Rupture';
    if (stock < 10) return 'Faible stock';
    return 'En stock';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
            <p className="mt-1 text-sm text-gray-600">
              Gérez votre catalogue de produits ({filteredProducts.length} produits)
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
          >
            <FaPlus className="mr-2" />
            Ajouter un produit
          </button>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center">
                      Catégorie
                      <FaSort className="ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Prix
                      <FaSort className="ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center">
                      Stock
                      <FaSort className="ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Aucun produit trouvé
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 border border-gray-200">
                            {product.image || product.image_url ? (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={getImageUrl(product.image)}
                                alt={product.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder.png';
                                }}
                              />
                            ) : (
                              <div className="h-12 w-12 flex items-center justify-center">
                                <FaImage className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              SKU: {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category && typeof product.category === 'object' && product.category.name 
                            ? product.category.name 
                            : 'Sans catégorie'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(product.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(getProductStatus(product.stock))}`}>
                          {getProductStatus(product.stock)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <Link
                            to={`/product/${product.slug}`}
                            className="text-gray-400 hover:text-gray-500"
                            title="Voir"
                            target="_blank"
                          >
                            <FaEye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-primary-600 hover:text-primary-700"
                            title="Modifier"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Supprimer"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EditProductModal
        product={selectedProduct}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default AdminProducts; 