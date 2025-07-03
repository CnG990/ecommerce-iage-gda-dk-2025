/**
 * Utilitaires pour la gestion des redirections
 */

/**
 * Sauvegarde la page actuelle pour une redirection future
 * @param {string} currentPath - Le chemin actuel
 */
export const saveCurrentPage = (currentPath) => {
  // Ne pas sauvegarder les pages d'authentification
  if (currentPath && 
      currentPath !== '/login' && 
      currentPath !== '/register' && 
      !currentPath.includes('/admin')) {
    localStorage.setItem('lastVisitedPage', currentPath);
    console.log('RedirectUtils - Page sauvegardée:', currentPath);
  }
};

/**
 * Récupère la dernière page visitée
 * @returns {string|null} - Le chemin de la dernière page visitée
 */
export const getLastVisitedPage = () => {
  const lastPage = localStorage.getItem('lastVisitedPage');
  if (lastPage && 
      lastPage !== '/login' && 
      lastPage !== '/register' && 
      !lastPage.includes('/admin')) {
    return lastPage;
  }
  return null;
};

/**
 * Détermine le chemin de redirection optimal pour un client
 * @param {Object} user - L'utilisateur connecté
 * @param {Object} location - L'objet location de React Router
 * @returns {string} - Le chemin de redirection
 */
export const getClientRedirectPath = (user, location) => {
  // 1. Vérifier s'il y a une page d'origine sauvegardée
  const fromPath = location.state?.from?.pathname;
  if (fromPath && 
      fromPath !== '/login' && 
      fromPath !== '/register' && 
      !fromPath.includes('/admin')) {
    console.log('RedirectUtils - Redirection vers la page d\'origine:', fromPath);
    return fromPath;
  }

  // 2. Vérifier s'il y a un paramètre de redirection dans l'URL
  const urlParams = new URLSearchParams(location.search);
  const redirectTo = urlParams.get('redirect');
  if (redirectTo && 
      redirectTo !== '/login' && 
      redirectTo !== '/register' && 
      !redirectTo.includes('/admin')) {
    console.log('RedirectUtils - Redirection depuis URL param:', redirectTo);
    return redirectTo;
  }

  // 3. Vérifier si l'utilisateur a des préférences sauvegardées
  const lastVisitedPage = getLastVisitedPage();
  if (lastVisitedPage) {
    console.log('RedirectUtils - Redirection vers la dernière page visitée:', lastVisitedPage);
    return lastVisitedPage;
  }

  // 4. Redirection par défaut intelligente
  // Si l'utilisateur vient de la page produits, retourner aux produits
  if (location.state?.from?.pathname?.includes('/product/')) {
    console.log('RedirectUtils - Redirection vers les produits (contexte produit)');
    return '/products';
  }

  // Si l'utilisateur vient du panier, retourner au panier
  if (location.state?.from?.pathname === '/cart') {
    console.log('RedirectUtils - Redirection vers le panier');
    return '/cart';
  }

  // Redirection par défaut vers la page d'accueil
  console.log('RedirectUtils - Redirection par défaut vers l\'accueil');
  return '/';
};

/**
 * Nettoie les données de redirection sauvegardées
 */
export const clearRedirectData = () => {
  localStorage.removeItem('lastVisitedPage');
  console.log('RedirectUtils - Données de redirection nettoyées');
};

/**
 * Vérifie si l'utilisateur est un administrateur
 * @param {Object} user - L'utilisateur
 * @returns {boolean} - True si l'utilisateur est admin
 */
export const isAdmin = (user) => {
  return user.roles && 
         Array.isArray(user.roles) && 
         user.roles.some(role => role.name === 'admin');
}; 