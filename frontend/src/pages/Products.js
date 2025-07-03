import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { 
  fetchProducts, 
  setFilters, 
  clearFilters, 
  applyFilters,
  setCurrentPage 
} from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductFilters from '../components/product/ProductFilters';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { FaFilter, FaSort, FaTh, FaList } from 'react-icons/fa';

// Constantes pour les valeurs par défaut
const DEFAULT_PRICE_RANGE = [0, 1000000];
const DEFAULT_FILTERS = {
  category: '',
  searchTerm: '',
  priceRange: DEFAULT_PRICE_RANGE,
  sortBy: 'name',
  inStock: false
};

const DEFAULT_PAGINATION = {
  currentPage: 1,
  productsPerPage: 12,
  totalPages: 1
};

const ProductsContent = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { 
    filteredProducts = [], 
    isLoading: productsLoading = false, 
    filters = DEFAULT_FILTERS,
    pagination = DEFAULT_PAGINATION
  } = useSelector((state) => state.products || {});

  const {
    categories = [],
    loading: categoriesLoading = false
  } = useSelector((state) => state.categories || {});

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState(filters.sortBy || 'name');

  // Chargement initial des données
  useEffect(() => {
    // Préparer les filtres pour l'API
    const apiFilters = {};
    if (filters.category) apiFilters.category_id = filters.category;
    if (filters.searchTerm) apiFilters.search = filters.searchTerm;
    if (filters.priceRange && filters.priceRange[0] > 0) apiFilters.min_price = filters.priceRange[0];
    if (filters.priceRange && filters.priceRange[1] < DEFAULT_PRICE_RANGE[1]) apiFilters.max_price = filters.priceRange[1];
    if (filters.sortBy && filters.sortBy !== 'name') apiFilters.sort_by = filters.sortBy.replace('-asc', '').replace('-desc', '');
    if (filters.sortBy && filters.sortBy.endsWith('-desc')) apiFilters.sort_order = 'desc';
    if (filters.sortBy && filters.sortBy.endsWith('-asc')) apiFilters.sort_order = 'asc';
    dispatch(fetchProducts(apiFilters));
    dispatch(fetchCategories());
  }, [dispatch, filters]);

  // Synchronisation des filtres avec l'URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const priceMinParam = searchParams.get('priceMin');
    const priceMaxParam = searchParams.get('priceMax');
    const sortParam = searchParams.get('sort');
    const pageParam = searchParams.get('page');

    const newFilters = {
      ...DEFAULT_FILTERS,
      ...filters,
      category: categoryParam || '',
      searchTerm: searchParam || '',
      priceRange: [
        priceMinParam ? parseInt(priceMinParam) : DEFAULT_PRICE_RANGE[0],
        priceMaxParam ? parseInt(priceMaxParam) : DEFAULT_PRICE_RANGE[1]
      ],
      sortBy: sortParam || 'name'
    };

    dispatch(setFilters(newFilters));
    setSortBy(sortParam || 'name');
    
    if (pageParam) {
      dispatch(setCurrentPage(parseInt(pageParam)));
    }
  }, [searchParams, dispatch]);

  // Application des filtres
  useEffect(() => {
    dispatch(applyFilters());
  }, [filters, dispatch]);

  const handleFilterChange = (newFilters) => {
    // Validation et valeurs par défaut
    const validatedFilters = {
      ...DEFAULT_FILTERS,
      ...newFilters,
      priceRange: newFilters?.priceRange || DEFAULT_PRICE_RANGE
    };

    dispatch(setFilters(validatedFilters));
    
    const params = new URLSearchParams(searchParams);
    
    // Mise à jour des paramètres d'URL
    if (validatedFilters.category) {
      params.set('category', validatedFilters.category);
    } else {
      params.delete('category');
    }
    
    if (validatedFilters.searchTerm) {
      params.set('search', validatedFilters.searchTerm);
    } else {
      params.delete('search');
    }
    
    if (validatedFilters.priceRange[0] > DEFAULT_PRICE_RANGE[0]) {
      params.set('priceMin', validatedFilters.priceRange[0].toString());
    } else {
      params.delete('priceMin');
    }
    
    if (validatedFilters.priceRange[1] < DEFAULT_PRICE_RANGE[1]) {
      params.set('priceMax', validatedFilters.priceRange[1].toString());
    } else {
      params.delete('priceMax');
    }
    
    if (validatedFilters.sortBy !== 'name') {
      params.set('sort', validatedFilters.sortBy);
    } else {
      params.delete('sort');
    }
    
    setSearchParams(params);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    handleFilterChange({
      ...filters,
      sortBy: value
    });
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSearchParams({});
    setSortBy('name');
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination
  const startIndex = ((pagination?.currentPage || 1) - 1) * (pagination?.productsPerPage || 12);
  const endIndex = startIndex + (pagination?.productsPerPage || 12);
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(startIndex, endIndex)
    : [];

  const sortOptions = [
    { value: 'name', label: 'Nom A-Z' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'newest', label: 'Plus récents' }
  ];

  const hasActiveFilters = 
    filters.category || 
    filters.searchTerm || 
    (filters.priceRange?.[0] > DEFAULT_PRICE_RANGE[0]) || 
    (filters.priceRange?.[1] < DEFAULT_PRICE_RANGE[1]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner size="lg" text="Chargement des produits..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Nos Produits
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez notre large gamme de produits de qualité
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filtres (desktop) */}
          <div className={`lg:col-span-3 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ErrorBoundary>
              <ProductFilters
                categories={Array.isArray(categories) ? categories : []}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </ErrorBoundary>
          </div>

          {/* Liste des produits */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
                  >
                    <FaFilter className="text-sm" />
                    Filtres
                  </button>
                  
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                  </span>

                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Effacer les filtres
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaSort className="text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <FaTh />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <FaList />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille des produits */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {currentProducts.map((product) => (
                <ErrorBoundary key={product.id}>
                  <ProductCard product={product} viewMode={viewMode} />
                </ErrorBoundary>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        page === pagination.currentPage
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => (
  <ErrorBoundary>
    <ProductsContent />
  </ErrorBoundary>
);

export default Products; 