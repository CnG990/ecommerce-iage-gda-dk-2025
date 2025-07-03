import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getClientRedirectPath, isAdmin, saveCurrentPage } from '../utils/redirectUtils';

/**
 * Hook personnalisé pour gérer les redirections après authentification
 */
export const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && user) {
      console.log('useRedirect - User après connexion:', user);
      console.log('useRedirect - Roles:', user.roles);
      
      const userIsAdmin = isAdmin(user);
      console.log('useRedirect - isAdmin:', userIsAdmin);
      
      if (userIsAdmin) {
        console.log('useRedirect - Redirection vers /admin');
        navigate('/admin', { replace: true });
      } else {
        // Logique de redirection améliorée pour les clients
        const redirectPath = getClientRedirectPath(user, location);
        console.log('useRedirect - Redirection client vers:', redirectPath);
        
        // Sauvegarder la page actuelle pour les futures redirections
        saveCurrentPage(redirectPath);
        
        navigate(redirectPath, { replace: true });
        
        // Afficher un message de bienvenue personnalisé
        const welcomeMessage = `Bienvenue ${user.first_name} !`;
      }
    }
  }, [isSuccess, user, navigate, location]);

  return { user, isSuccess };
}; 