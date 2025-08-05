# 🚀 Guide de Déploiement Backend Laravel sur Heroku

## 📋 Prérequis

### 1. Compte Heroku
- Créez un compte sur [heroku.com](https://heroku.com)
- Installez Heroku CLI : `npm install -g heroku`

### 2. Préparation du projet
- Votre projet doit être sur GitHub
- Assurez-vous que le dossier `backend/` contient votre application Laravel

## 🔧 Configuration Heroku

### 1. Connexion à Heroku
```bash
# Connexion à votre compte Heroku
heroku login

# Vérifiez que vous êtes connecté
heroku auth:whoami
```

### 2. Création de l'application Heroku
```bash
# Créez une nouvelle application Heroku
heroku create votre-app-name

# Ou si vous voulez un nom spécifique
heroku create ecommerce-backend-api-2025
```

### 3. Configuration de la base de données
```bash
# Ajoutez PostgreSQL (base de données)
heroku addons:create heroku-postgresql:mini

# Ajoutez Redis (cache et sessions)
heroku addons:create heroku-redis:mini

# Vérifiez les add-ons installés
heroku addons
```

## ⚙️ Configuration de l'environnement

### 1. Variables d'environnement
```bash
# Configurez les variables d'environnement
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false
heroku config:set APP_KEY=$(php artisan key:generate --show)
heroku config:set APP_URL=https://votre-app-name.herokuapp.com

# Base de données
heroku config:set DB_CONNECTION=pgsql
heroku config:set DB_HOST=$(heroku config:get DATABASE_URL | cut -d'@' -f2 | cut -d'/' -f1)
heroku config:set DB_PORT=5432
heroku config:set DB_DATABASE=$(heroku config:get DATABASE_URL | cut -d'/' -f4)
heroku config:set DB_USERNAME=$(heroku config:get DATABASE_URL | cut -d'/' -f3 | cut -d':' -f1)
heroku config:set DB_PASSWORD=$(heroku config:get DATABASE_URL | cut -d'/' -f3 | cut -d':' -f2 | cut -d'@' -f1)

# Cache et sessions
heroku config:set CACHE_DRIVER=redis
heroku config:set SESSION_DRIVER=redis
heroku config:set QUEUE_CONNECTION=redis
heroku config:set REDIS_HOST=$(heroku config:get REDIS_URL | cut -d'@' -f2 | cut -d':' -f1)
heroku config:set REDIS_PASSWORD=$(heroku config:get REDIS_URL | cut -d'@' -f1 | cut -d'/' -f3)
heroku config:set REDIS_PORT=$(heroku config:get REDIS_URL | cut -d'@' -f2 | cut -d':' -f2)

# CORS pour le frontend Vercel
heroku config:set CORS_ALLOWED_ORIGINS=https://ecommerce-iage-gda-dk-2025.vercel.app

# Autres variables importantes
heroku config:set LOG_CHANNEL=stack
heroku config:set BROADCAST_DRIVER=log
```

### 2. Vérification des variables
```bash
# Vérifiez toutes les variables configurées
heroku config
```

## 📦 Déploiement

### 1. Préparation du déploiement
```bash
# Assurez-vous d'être dans le dossier backend
cd backend

# Vérifiez que tous les fichiers sont commités
git add .
git commit -m "Configuration Heroku pour déploiement"
git push origin master
```

### 2. Déploiement sur Heroku
```bash
# Ajoutez Heroku comme remote
heroku git:remote -a votre-app-name

# Déployez
git push heroku master

# Ou si vous êtes sur la branche main
git push heroku main
```

### 3. Configuration post-déploiement
```bash
# Exécutez les migrations
heroku run php artisan migrate --force

# Générez la clé d'application
heroku run php artisan key:generate

# Cachez la configuration
heroku run php artisan config:cache
heroku run php artisan route:cache
heroku run php artisan view:cache

# Optimisez l'application
heroku run php artisan optimize
```

## 🔍 Vérification du déploiement

### 1. Test de l'application
```bash
# Ouvrez l'application
heroku open

# Vérifiez les logs
heroku logs --tail

# Testez l'API
curl https://votre-app-name.herokuapp.com/api/health
```

### 2. Test des routes API
```bash
# Testez les routes principales
curl https://votre-app-name.herokuapp.com/api/products
curl https://votre-app-name.herokuapp.com/api/categories
```

## 🔗 Configuration Frontend

### 1. Mise à jour de l'URL API
Dans votre frontend, mettez à jour l'URL de l'API :

```javascript
// frontend/src/config/axios.js
const API_URL = process.env.REACT_APP_API_URL || 'https://votre-app-name.herokuapp.com/api';
```

### 2. Variables d'environnement Vercel
Dans votre dashboard Vercel, ajoutez :
```
REACT_APP_API_URL=https://votre-app-name.herokuapp.com/api
```

## 📊 Monitoring et Maintenance

### 1. Logs et monitoring
```bash
# Voir les logs en temps réel
heroku logs --tail

# Voir les logs des dernières heures
heroku logs --num 1000

# Monitoring de l'application
heroku ps
```

### 2. Base de données
```bash
# Accéder à la base de données
heroku pg:psql

# Voir les informations de la DB
heroku pg:info

# Backup de la base de données
heroku pg:backups:capture
```

### 3. Redis
```bash
# Accéder à Redis
heroku redis:cli

# Voir les informations Redis
heroku redis:info
```

## 🛠️ Dépannage

### Problèmes courants :

#### 1. Erreur de build
```bash
# Vérifiez les logs de build
heroku logs --tail

# Forcez un rebuild
git commit --allow-empty -m "Force rebuild"
git push heroku master
```

#### 2. Erreur de base de données
```bash
# Vérifiez la connexion DB
heroku run php artisan tinker
# Testez : DB::connection()->getPdo();

# Réinitialisez la base de données
heroku run php artisan migrate:fresh --seed
```

#### 3. Erreur de cache
```bash
# Nettoyez le cache
heroku run php artisan cache:clear
heroku run php artisan config:clear
heroku run php artisan route:clear
heroku run php artisan view:clear
```

## 💰 Coûts Heroku

### Plan gratuit (discontinué)
- ❌ Plus disponible

### Plan Eco ($5/mois)
- ✅ 512 MB RAM
- ✅ Base de données PostgreSQL
- ✅ Redis
- ✅ Domaine personnalisé

### Plan Basic ($7/mois)
- ✅ 512 MB RAM
- ✅ Base de données PostgreSQL
- ✅ Redis
- ✅ Domaine personnalisé
- ✅ Support prioritaire

## 🔒 Sécurité

### 1. Variables sensibles
```bash
# Ne jamais commiter les clés sensibles
echo ".env" >> .gitignore
echo "storage/logs/*" >> .gitignore
```

### 2. CORS Configuration
Dans `config/cors.php` :
```php
'allowed_origins' => [
    'https://ecommerce-iage-gda-dk-2025.vercel.app',
    'https://votre-app-name.herokuapp.com'
],
```

## 📈 Performance

### 1. Optimisations
```bash
# Cache des routes
heroku run php artisan route:cache

# Cache des vues
heroku run php artisan view:cache

# Cache de la configuration
heroku run php artisan config:cache

# Optimisation des autoloaders
composer install --optimize-autoloader --no-dev
```

### 2. Monitoring
- Utilisez New Relic (add-on Heroku)
- Configurez les alertes
- Surveillez les performances

## ✅ Checklist de déploiement

- [ ] Compte Heroku créé
- [ ] Heroku CLI installé
- [ ] Application Heroku créée
- [ ] PostgreSQL ajouté
- [ ] Redis ajouté
- [ ] Variables d'environnement configurées
- [ ] Code déployé
- [ ] Migrations exécutées
- [ ] Cache optimisé
- [ ] API testée
- [ ] Frontend configuré
- [ ] Monitoring configuré

## 🎯 URLs finales

- **Backend API** : `https://votre-app-name.herokuapp.com`
- **Frontend** : `https://ecommerce-iage-gda-dk-2025.vercel.app`
- **Documentation API** : `https://votre-app-name.herokuapp.com/api/documentation`

---

**🚀 Votre backend Laravel est maintenant prêt à être déployé sur Heroku !** 