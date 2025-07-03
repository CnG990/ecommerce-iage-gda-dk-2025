import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price) + ' FCFA';
};

const DEFAULT_PRICE_RANGE = [0, 1000000];

const ProductFilters = ({ categories = [], filters = {}, onFilterChange, onClearFilters }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    search: true
  });

  // Ensure filters.priceRange has a default value
  const defaultFilters = {
    category: '',
    searchTerm: '',
    priceRange: DEFAULT_PRICE_RANGE,
    ...filters
  };

  const [priceRange, setPriceRange] = useState(defaultFilters.priceRange);
  const [searchTerm, setSearchTerm] = useState(defaultFilters.searchTerm);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({
      ...defaultFilters,
      category: defaultFilters.category === categoryId ? '' : categoryId
    });
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    onFilterChange({
      ...defaultFilters,
      priceRange: newRange
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({
      ...defaultFilters,
      searchTerm: value
    });
  };

  const hasActiveFilters = defaultFilters.category || defaultFilters.searchTerm || 
    defaultFilters.priceRange[0] > 0 || defaultFilters.priceRange[1] < DEFAULT_PRICE_RANGE[1];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Recherche */}
      <div>
        <button
          onClick={() => toggleSection('search')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">Recherche</h3>
          {openSections.search ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {openSections.search && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Catégories */}
      <div>
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">Catégories</h3>
          {openSections.categories ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {openSections.categories && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={!defaultFilters.category}
                onChange={() => handleCategoryChange('')}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Toutes les catégories</span>
            </label>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={defaultFilters.category === category.id.toString()}
                    onChange={() => handleCategoryChange(category.id.toString())}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                  {category.productCount && (
                    <span className="text-xs text-gray-500">({category.productCount})</span>
                  )}
                </label>
              ))
            ) : (
              <div className="text-sm text-gray-500 py-2">
                Chargement des catégories...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prix */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">Prix</h3>
          {openSections.price ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {openSections.price && (
          <div className="mt-3 space-y-4">
            {/* Sliders de prix */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Min: {formatPrice(priceRange[0])}</span>
                <span className="text-sm text-gray-600">Max: {formatPrice(priceRange[1])}</span>
              </div>
              
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Gammes de prix prédéfinies */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-700">Gammes populaires</h4>
              {[
                { label: 'Moins de 25 000 FCFA', range: [0, 25000] },
                { label: '25 000 - 50 000 FCFA', range: [25000, 50000] },
                { label: '50 000 - 100 000 FCFA', range: [50000, 100000] },
                { label: '100 000 - 250 000 FCFA', range: [100000, 250000] },
                { label: '250 000 - 500 000 FCFA', range: [250000, 500000] },
                { label: 'Plus de 500 000 FCFA', range: [500000, 1000000] }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePriceChange(preset.range)}
                  className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${
                    priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-3">
          Filtres actifs: {[
            defaultFilters.category && 'Catégorie',
            defaultFilters.searchTerm && 'Recherche',
            (defaultFilters.priceRange[0] > 0 || defaultFilters.priceRange[1] < DEFAULT_PRICE_RANGE[1]) && 'Prix'
          ].filter(Boolean).join(', ') || 'Aucun'}
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Réinitialiser tous les filtres
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters; 