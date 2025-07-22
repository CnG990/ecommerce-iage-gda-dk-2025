# Guide de Déploiement - Plateforme E-Commerce

## 🚀 Étapes de Déploiement

### 1. Préparation du Repository GitHub

#### Étape 1: Initialiser Git (si pas déjà fait)
```bash
git init
git add .
git commit -m "Initial commit - Projet E-commerce IAGE GDA DK 2025"
```

#### Étape 2: Créer un repository sur GitHub
1. Aller sur [GitHub.com](https://github.com)
2. Cliquer sur "New repository"
3. Nommer le repository : `ecommerce-iage-gda-dk-2025`
4. Choisir "Public" ou "Private"
5. Ne pas initialiser avec README (déjà créé)

#### Étape 3: Pousser le code
```bash
git remote add origin https://github.com/VOTRE_USERNAME/ecommerce-iage-gda-dk-2025.git
git branch -M main
git push -u origin main
```

### 2. Déploiement du Frontend (Vercel)

#### Option A: Déploiement via GitHub (Recommandé)
1. Aller sur [Vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Importer le repository `ecommerce-iage-gda-dk-2025`
5. Configurer le projet :
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

#### Option B: Déploiement manuel
```bash
cd frontend
npm run build
# Puis uploader le dossier 'build' sur Vercel
```

#### Configuration des Variables d'Environnement sur Vercel
1. Dans le dashboard Vercel, aller dans "Settings" > "Environment Variables"
2. Ajouter les variables suivantes :
   ```
   REACT_APP_API_URL=https://votre-backend-url.com/api
   REACT_APP_BASE_URL=https://votre-frontend-url.vercel.app
   ```

### 3. Déploiement du Backend

#### Option A: Railway (Recommandé)
1. Aller sur [Railway.app](https://railway.app)
2. Se connecter avec GitHub
3. Cliquer sur "New Project" > "Deploy from GitHub repo"
4. Sélectionner le repository
5. Configurer le backend selon sa technologie (Node.js, Python, etc.)

#### Option B: Render
1. Aller sur [Render.com](https://render.com)
2. Créer un compte et se connecter
3. Cliquer sur "New" > "Web Service"
4. Connecter le repository GitHub
5. Configurer le service selon la technologie du backend

### 4. Configuration des Domaines

#### Frontend
- Vercel fournit automatiquement un domaine : `https://votre-projet.vercel.app`
- Possibilité d'ajouter un domaine personnalisé dans les paramètres

#### Backend
- Railway : `https://votre-projet.railway.app`
- Render : `https://votre-projet.onrender.com`

### 5. Mise à jour des URLs

Après déploiement, mettre à jour l'URL de l'API dans le frontend :

1. Dans Vercel, aller dans "Settings" > "Environment Variables"
2. Modifier `REACT_APP_API_URL` avec l'URL de votre backend déployé
3. Redéployer l'application

### 6. Test Final

1. Tester toutes les fonctionnalités sur l'application déployée
2. Vérifier que les images se chargent correctement
3. Tester le processus d'achat complet
4. Vérifier les emails de notification

## 🔧 Configuration Avancée

### Variables d'Environnement Recommandées

#### Frontend (.env.production)
```
REACT_APP_API_URL=https://votre-backend-url.com/api
REACT_APP_BASE_URL=https://votre-frontend-url.vercel.app
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Backend
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_API_KEY=your_email_service_key
```

### Optimisations de Performance

1. **Images** : Utiliser des formats optimisés (WebP, AVIF)
2. **Lazy Loading** : Implémenter le chargement différé des images
3. **Caching** : Configurer les headers de cache appropriés
4. **Compression** : Activer la compression gzip/brotli

## 📊 Monitoring et Analytics

### Vercel Analytics
- Activer Vercel Analytics pour suivre les performances
- Configurer les événements personnalisés

### Error Tracking
- Intégrer Sentry pour le suivi des erreurs
- Configurer les alertes par email

## 🔒 Sécurité

### Checklist Sécurité
- [ ] HTTPS activé sur tous les domaines
- [ ] Variables d'environnement sécurisées
- [ ] CORS configuré correctement
- [ ] Validation des données côté serveur
- [ ] Protection contre les attaques XSS et CSRF

## 📱 PWA (Progressive Web App)

Pour transformer l'application en PWA :

1. Créer un `manifest.json`
2. Ajouter un Service Worker
3. Configurer les icônes appropriées
4. Tester l'installation sur mobile

## 🚨 Dépannage

### Problèmes Courants

#### Frontend ne se charge pas
- Vérifier les variables d'environnement
- Contrôler les erreurs dans la console
- Vérifier la configuration CORS du backend

#### Images ne s'affichent pas
- Vérifier les chemins relatifs
- S'assurer que les images sont bien uploadées
- Contrôler les permissions de fichiers

#### API ne répond pas
- Vérifier l'URL de l'API
- Contrôler les logs du backend
- Tester l'API directement avec Postman

## 📞 Support

En cas de problème :
1. Vérifier les logs dans les dashboards de déploiement
2. Consulter la documentation des plateformes
3. Utiliser les outils de debugging intégrés

---

**Note** : Ce guide est spécifique au projet IAGE GDA DK 2025. Adapter selon vos besoins spécifiques. 