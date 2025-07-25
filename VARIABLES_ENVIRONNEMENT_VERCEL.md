# 🌐 Configuration Variables d'Environnement - Vercel

## 🚨 Problème : Erreurs JavaScript dues aux variables d'environnement manquantes

### ✅ Solution : Configuration des variables d'environnement sur Vercel

#### 1. 🎯 Accéder aux variables d'environnement
1. Allez dans votre dashboard Vercel
2. Cliquez sur votre projet `ecommerce-iage-gda-dk-2025`
3. Allez dans **"Settings"** (en haut à droite)
4. Cliquez sur **"Environment Variables"**

#### 2. ⚙️ Ajouter les variables nécessaires

Ajoutez ces variables d'environnement :

```
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Important** : Remplacez `your-backend-url.com` par l'URL de votre backend.

#### 3. 🔧 Variables optionnelles (si utilisées)

Si vous utilisez ces services, ajoutez aussi :

```
# Firebase (si utilisé)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Google OAuth (si utilisé)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# Stripe (pour les paiements)
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

#### 4. 🔄 Redéploiement après configuration

Après avoir ajouté les variables :
1. Allez dans **"Deployments"**
2. Cliquez sur **"Redeploy"** sur le dernier déploiement
3. Ou poussez un nouveau commit sur GitHub

### 🎯 Configuration recommandée

#### Pour le développement local :
Créez un fichier `.env.local` dans le dossier `frontend` :

```env
REACT_APP_API_URL=http://localhost:8000/api
```

#### Pour la production Vercel :
Dans l'interface Vercel, ajoutez :

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### 🔍 Vérifications après configuration

#### 1. ✅ Test de l'application
- Allez sur : `https://ecommerce-iage-gda-dk-2025.vercel.app/`
- Vérifiez que la page se charge sans erreur
- Testez la navigation

#### 2. ✅ Console du navigateur
- Ouvrez les outils de développement (F12)
- Allez dans l'onglet "Console"
- Vérifiez qu'il n'y a pas d'erreurs

#### 3. ✅ Appels API
- Testez les fonctionnalités qui font des appels API
- Vérifiez que les données se chargent correctement

### 🐛 Si les erreurs persistent

#### Option A : Backend temporaire
Si vous n'avez pas de backend, utilisez une API temporaire :

```env
REACT_APP_API_URL=https://jsonplaceholder.typicode.com
```

#### Option B : Mode développement
Pour tester sans backend, modifiez temporairement :

```env
REACT_APP_API_URL=http://localhost:3000
```

#### Option C : Désactiver les appels API
Temporairement, commentez les appels API dans le code pour tester l'interface.

### 📞 Support

- **Documentation Vercel** : https://vercel.com/docs/environment-variables
- **Support Vercel** : https://vercel.com/support
- **Variables React** : https://create-react-app.dev/docs/adding-custom-environment-variables

---

**💡 Conseil** : La variable `REACT_APP_API_URL` est essentielle pour que l'application fonctionne correctement. Assurez-vous qu'elle pointe vers votre backend valide. 