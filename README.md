# Plateforme E-Commerce IAGE GDA DK 2025

## 📋 Description
Application web e-commerce complète développée dans le cadre du projet IAGE GDA DK 2025. Cette plateforme permet la vente en ligne de produits avec gestion des commandes, paiements et interface d'administration.

## ✨ Fonctionnalités Principales

### 🛒 Front-Office Client
- ✅ Catalogue de produits avec filtrage et recherche avancée
- ✅ Fiche produit détaillée avec images et descriptions
- ✅ Gestion du panier (ajout, suppression, modification des quantités)
- ✅ Passage de commande avec choix du mode de paiement
- ✅ Compte client (inscription, connexion, gestion du profil)
- ✅ Historique des commandes avec suivi en temps réel
- ✅ Notifications par email automatiques
- ✅ Génération de factures PDF personnalisées

### 🔧 Back-Office Administrateur
- ✅ Gestion complète des produits (CRUD)
- ✅ Gestion des catégories et sous-catégories
- ✅ Gestion des commandes et suivi des statuts
- ✅ Gestion des utilisateurs et rôles
- ✅ Tableau de bord avec statistiques détaillées
- ✅ Envoi automatique d'emails de confirmation

### 💳 Gestion des Paiements
- ✅ Paiement avant livraison (simulation sécurisée)
- ✅ Paiement après livraison
- ✅ Suivi des statuts de paiement en temps réel
- ✅ Intégration avec plusieurs moyens de paiement

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.2.0** - Interface utilisateur moderne
- **Redux Toolkit** - Gestion d'état centralisée
- **React Router** - Navigation fluide
- **Tailwind CSS** - Design responsive et moderne
- **Axios** - Requêtes HTTP optimisées
- **React Toastify** - Notifications utilisateur

### Backend
- **API REST** - Architecture robuste et scalable
- **Base de données** - Gestion optimisée des données
- **Authentification JWT** - Sécurité renforcée
- **Validation des données** - Intégrité des informations

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Serveur web local (XAMPP, Laragon, etc.)

### Frontend
```bash
cd frontend
npm install
npm start
```
L'application sera accessible sur `http://localhost:3000`

### Backend
Extraire le fichier `backend.zip` et suivre les instructions dans le dossier backend.

## 📁 Structure du Projet

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

## 🌐 Déploiement

### Frontend (Vercel)
1. Build de l'application : `npm run build`
2. Déploiement sur Vercel
3. Configuration des variables d'environnement

### Backend (Railway/Render)
1. Déployer l'API sur Railway ou Render
2. Configurer les variables d'environnement
3. Mettre à jour l'URL de l'API dans le frontend

## 👥 Équipe de Développement
- **Cheikh Ngom** - Développeur Frontend React
- **Balla Niang** - Développeur Backend API
- **Étudiant 2** - Intégration et déploiement

## 📊 Fonctionnalités Avancées

### Sécurité
- Authentification JWT sécurisée
- Validation des données côté client et serveur
- Protection CSRF
- Chiffrement des mots de passe

### Performance
- Lazy loading des images
- Optimisation des requêtes API
- Mise en cache intelligente
- Compression des assets

### Expérience Utilisateur
- Interface responsive design
- Animations fluides
- Feedback utilisateur en temps réel
- Navigation intuitive

## 🔧 Configuration

### Variables d'Environnement
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BASE_URL=http://localhost:3000
```

## 📞 Support
Pour toute question ou problème, contactez l'équipe de développement.

## 📄 Licence
Projet académique - IAGE GDA DK 2025

---

**Développé avec ❤️ au Sénégal** 