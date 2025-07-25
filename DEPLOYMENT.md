# 🚀 Guide de Déploiement - Projet IAGE GDA DK 2025

## 📋 Vue d'ensemble

Ce guide vous accompagne pour déployer votre application e-commerce React sur Vercel.

## 🎯 Prérequis

- ✅ Compte Vercel (gratuit)
- ✅ Git installé
- ✅ Node.js (version 16+)
- ✅ Backend API déployé et accessible

## 🛠️ Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` dans le dossier `frontend` :

```env
# Configuration API - IMPORTANT: Remplacez par votre URL de backend
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

## 🚀 Déploiement

### Option A : Interface Web Vercel (Recommandé)

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Connectez-vous** avec votre compte GitHub/GitLab/Bitbucket
3. **Cliquez sur "New Project"**
4. **Importez votre repository** depuis GitHub
5. **Configurez le projet :**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. **Ajoutez les variables d'environnement** dans l'interface Vercel
7. **Cliquez sur "Deploy"**

### Option B : CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd frontend
vercel

# Pour les déploiements suivants
vercel --prod
```

### Option C : Script automatisé

```bash
cd frontend
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

## ⚙️ Configuration Vercel

### Variables d'environnement

Dans l'interface Vercel :

1. Allez dans votre projet
2. Settings → Environment Variables
3. Ajoutez toutes les variables nécessaires

### Configuration CORS (Backend)

Votre backend doit autoriser les requêtes depuis votre domaine Vercel :

```javascript
// Exemple pour Express.js
app.use(cors({
  origin: [
    'https://your-vercel-app.vercel.app',
    'http://localhost:3000' // Pour le développement
  ],
  credentials: true
}));
```

## 🔍 Vérification

Après le déploiement, vérifiez :

1. ✅ **Page d'accueil** se charge correctement
2. ✅ **Navigation** entre les pages fonctionne
3. ✅ **Appels API** vers votre backend fonctionnent
4. ✅ **Authentification** (login/logout) fonctionne
5. ✅ **Redirections** après login/logout
6. ✅ **Images et assets** se chargent
7. ✅ **Responsive design** sur mobile

## 🐛 Problèmes courants

### Erreur 404 sur les routes
- ✅ Le fichier `vercel.json` est correctement configuré
- ✅ Toutes les routes redirigent vers `index.html`

### Erreurs CORS
- ✅ Votre backend autorise les requêtes depuis votre domaine Vercel
- ✅ Les credentials sont configurés

### Variables d'environnement non définies
- ✅ Toutes les variables sont configurées dans Vercel
- ✅ Redéployez après avoir ajouté de nouvelles variables

### Images ne se chargent pas
- ✅ Vérifiez les chemins des images
- ✅ Assurez-vous que les images sont dans le dossier `public`

## 📊 Monitoring

### Vercel Analytics
- Activez Vercel Analytics pour suivre les performances
- Surveillez les erreurs dans les logs Vercel

### Performance
- Utilisez Lighthouse pour auditer les performances
- Optimisez les images et le code si nécessaire

## 🔄 Mises à jour

Pour déployer des mises à jour :

1. **Poussez vos changements** sur GitHub
2. **Vercel déploie automatiquement** (si connecté à GitHub)
3. **Ou utilisez** `vercel --prod` pour déployer manuellement

## 📞 Support

- 📖 [Documentation Vercel](https://vercel.com/docs)
- 🐛 [Issues GitHub](https://github.com/your-repo/issues)
- 💬 [Support Vercel](https://vercel.com/support)

---

**🎉 Félicitations ! Votre application e-commerce est maintenant en ligne !** 