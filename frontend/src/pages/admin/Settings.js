import React, { useState } from 'react';
import { FaCog, FaBell, FaGlobe, FaShieldAlt, FaDatabase, FaTimes, FaCheck } from 'react-icons/fa';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Général', icon: FaCog },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'security', name: 'Sécurité', icon: FaShieldAlt },
    { id: 'localization', name: 'Localisation', icon: FaGlobe },
    { id: 'backup', name: 'Sauvegarde', icon: FaDatabase },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les paramètres de votre boutique en ligne
        </p>
      </div>

      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'general' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres généraux</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom de la boutique</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Ma boutique en ligne"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Description de votre boutique"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email de contact</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="contact@maboutique.com"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres des notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
                  <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 bg-primary-600"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                    <span className="opacity-0 duration-100 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity">
                      <FaTimes className="h-3 w-3 text-gray-400" />
                    </span>
                    <span className="opacity-100 duration-200 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity">
                      <FaCheck className="h-3 w-3 text-primary-600" />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres de sécurité</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Délai d'expiration de session (minutes)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tentatives de connexion maximales
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="5"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'localization' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres de localisation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Devise</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="FCFA">FCFA</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Langue</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fuseau horaire</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="UTC+1">UTC+1</option>
                  <option value="UTC+2">UTC+2</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres de sauvegarde</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fréquence de sauvegarde automatique
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rétention des sauvegardes (jours)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="30"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sauvegarder maintenant
              </button>
            </div>
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Annuler
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 