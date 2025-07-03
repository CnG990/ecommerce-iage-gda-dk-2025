# Guide du Système de Redirection Client

## Vue d'ensemble

Le système de redirection client a été amélioré pour offrir une expérience utilisateur optimale avec des redirections intelligentes basées sur le contexte de navigation.

## Composants du système

### 1. Utilitaires de redirection (`redirectUtils.js`)

#### Fonctions principales :
- `saveCurrentPage(path)` : Sauvegarde la page actuelle
- `getLastVisitedPage()` : Récupère la dernière page visitée
- `getClientRedirectPath(user, location)` : Détermine le chemin de redirection optimal
- `isAdmin(user)` : Vérifie si l'utilisateur est administrateur
- `clearRedirectData()` : Nettoie les données de redirection

### 2. Hook personnalisé (`useRedirect.js`)

Gère automatiquement les redirections après authentification avec :
- Détection du rôle utilisateur (admin/client)
- Redirection intelligente basée sur le contexte
- Messages de bienvenue personnalisés

### 3. Composants de redirection (`RedirectHandler.js`)

- `LoginLink` : Lien vers la page de connexion avec sauvegarde automatique
- `ProtectedLink` : Lien vers des pages protégées avec redirection
- `createLoginUrl()` : Crée une URL de connexion avec paramètre de redirection
- `createLoginLink()` : Crée un lien de connexion avec redirection

## Logique de redirection

### Priorité des redirections (dans l'ordre) :

1. **Page d'origine sauvegardée** (`location.state.from.pathname`)
2. **Paramètre d'URL** (`?redirect=/path`)
3. **Dernière page visitée** (localStorage)
4. **Redirection contextuelle** :
   - Page produit → `/products`
   - Panier → `/cart`
5. **Page d'accueil** (`/`)

### Exemples de redirection :

```javascript
// Redirection depuis une page produit
// URL: /product/chargeur-voiture
// Après connexion → /products

// Redirection depuis le panier
// URL: /cart
// Après connexion → /cart

// Redirection avec paramètre d'URL
// URL: /login?redirect=/products
// Après connexion → /products

// Redirection par défaut
// URL: /login
// Après connexion → /
```

## Utilisation

### Dans un composant :

```javascript
import { useRedirect } from '../hooks/useRedirect';
import { LoginLink, ProtectedLink } from '../components/common/RedirectHandler';

const MyComponent = () => {
  const { user, isSuccess } = useRedirect();
  
  return (
    <div>
      {/* Lien vers la connexion avec sauvegarde automatique */}
      <LoginLink to="/login">Se connecter</LoginLink>
      
      {/* Lien vers une page protégée */}
      <ProtectedLink to="/cart">Mon panier</ProtectedLink>
    </div>
  );
};
```

### Création de liens programmatiques :

```javascript
import { createLoginLink } from '../components/common/RedirectHandler';

// Créer un lien de connexion avec redirection
const loginLink = createLoginLink('/products', 'Voir les produits', 'btn-primary');
```

## Avantages du système

1. **Expérience utilisateur fluide** : L'utilisateur retourne là où il était
2. **Contexte préservé** : Les actions en cours sont maintenues
3. **Flexibilité** : Support des paramètres d'URL et du localStorage
4. **Maintenabilité** : Code centralisé et réutilisable
5. **Messages personnalisés** : Accueil personnalisé avec le prénom

## Tests

Pour tester le système :

1. **Compte client** : `sophie.dubois@gmail.com` / `password`
2. **Compte admin** : `admin@ecommerce.com` / `password`

### Scénarios de test :

1. Naviguer vers `/products` → Cliquer sur "Se connecter" → Se connecter → Retour à `/products`
2. Naviguer vers `/cart` → Se connecter → Retour au panier
3. Accéder directement à `/login` → Se connecter → Redirection vers `/`
4. Utiliser un lien avec paramètre : `/login?redirect=/products` → Se connecter → Redirection vers `/products` 