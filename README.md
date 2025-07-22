# Plateforme E-Commerce IAGE GDA DK 2025

## Description
Application web e-commerce complète développée dans le cadre du projet IAGE GDA DK 2025. Cette plateforme permet la vente en ligne de produits avec gestion des commandes, paiements et interface d'administration.

## Fonctionnalités

### Front-Office Client
- ✅ Catalogue de produits avec filtrage et recherche
- ✅ Fiche produit détaillée
- ✅ Gestion du panier (ajout, suppression, modification des quantités)
- ✅ Passage de commande avec choix du mode de paiement
- ✅ Compte client (inscription, connexion, gestion du profil)
- ✅ Historique des commandes
- ✅ Notifications par email
- ✅ Génération de factures PDF

### Back-Office Administrateur
- ✅ Gestion des produits (CRUD)
- ✅ Gestion des catégories
- ✅ Gestion des commandes et suivi des statuts
- ✅ Gestion des utilisateurs
- ✅ Tableau de bord avec statistiques
- ✅ Envoi automatique d'emails

### Gestion des Paiements
- ✅ Paiement avant livraison (simulation)
- ✅ Paiement après livraison
- ✅ Suivi des statuts de paiement

## Technologies Utilisées

### Frontend
- React 18.2.0
- Redux Toolkit pour la gestion d'état
- React Router pour la navigation
- Tailwind CSS pour le styling
- Axios pour les requêtes HTTP
- React Toastify pour les notifications

### Backend
- API REST (détails dans le fichier backend.zip)

## Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Frontend
```bash
cd frontend
npm install
npm start
```

Le frontend sera accessible sur `http://localhost:3000`

### Backend
Extraire le fichier `backend.zip` et suivre les instructions dans le dossier backend.

## Structure du Projet

```
Projet IAGE GDA DK 2025/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── redux/          # Gestion d'état Redux
│   │   ├── services/       # Services API
│   │   └── utils/          # Utilitaires
│   └── public/             # Assets statiques
├── storage/                 # Stockage des images
└── backend.zip             # Backend de l'application
```

## Déploiement

### Frontend (Vercel)
1. Build de l'application : `npm run build`
2. Déploiement sur Vercel
3. Configuration des variables d'environnement

### Backend (Railway/Render)
1. Déployer l'API sur Railway ou Render
2. Configurer les variables d'environnement
3. Mettre à jour l'URL de l'API dans le frontend

## Équipe de Développement
- Cheikh Ngom - Frontend React
- Balla Niang - Backend API
- 2 - Intégration et déploiement

## Licence
Projet académique - IAGE GDA DK 2025 