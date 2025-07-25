# Guide de Déploiement Vercel

## Prérequis

1. Avoir un compte Vercel (gratuit)
2. Avoir Git installé
3. Avoir Node.js installé (version 16 ou supérieure)

## Étapes de déploiement

### 1. Préparation du projet

Assurez-vous que votre projet est prêt pour la production :

```bash
cd frontend
npm install
npm run build
```

### 2. Variables d'environnement

Créez un fichier `.env.local` dans le dossier `frontend` avec les variables suivantes :

```env
# Configuration API - Remplacez par votre URL de backend
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_BASE_URL=https://your-vercel-app.vercel.app

# Configuration Firebase (si utilisé)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Configuration Google OAuth (si utilisé)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# Configuration Stripe (pour les paiements)
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Déploiement via Vercel CLI

#### Option A : Déploiement via l'interface web (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub/GitLab/Bitbucket
3. Cliquez sur "New Project"
4. Importez votre repository
5. Configurez les variables d'environnement dans l'interface Vercel
6. Cliquez sur "Deploy"

#### Option B : Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
cd frontend
vercel

# Pour les déploiements suivants
vercel --prod
```

### 4. Configuration des variables d'environnement sur Vercel

Dans l'interface Vercel :

1. Allez dans votre projet
2. Cliquez sur "Settings"
3. Allez dans "Environment Variables"
4. Ajoutez toutes les variables d'environnement nécessaires

### 5. Configuration du domaine personnalisé (optionnel)

1. Dans les paramètres de votre projet Vercel
2. Allez dans "Domains"
3. Ajoutez votre domaine personnalisé
4. Suivez les instructions pour configurer les DNS

## Configuration spécifique

### Backend API

Assurez-vous que votre backend est déployé et accessible. Mettez à jour `REACT_APP_API_URL` avec l'URL de votre backend.

### CORS

Votre backend doit autoriser les requêtes depuis votre domaine Vercel. Ajoutez votre domaine Vercel dans la configuration CORS de votre backend.

### Redirection

Le fichier `vercel.json` est déjà configuré pour gérer les routes React Router. Toutes les routes non trouvées redirigeront vers `index.html`.

## Vérification du déploiement

1. Vérifiez que votre application se charge correctement
2. Testez les fonctionnalités principales
3. Vérifiez que les appels API fonctionnent
4. Testez l'authentification et les redirections

## Problèmes courants

### Erreur 404 sur les routes
- Vérifiez que le fichier `vercel.json` est correctement configuré
- Assurez-vous que toutes les routes redirigent vers `index.html`

### Erreurs CORS
- Vérifiez que votre backend autorise les requêtes depuis votre domaine Vercel
- Mettez à jour la configuration CORS de votre backend

### Variables d'environnement non définies
- Vérifiez que toutes les variables sont configurées dans l'interface Vercel
- Redéployez après avoir ajouté de nouvelles variables

## Support

Pour plus d'informations, consultez la [documentation Vercel](https://vercel.com/docs). 