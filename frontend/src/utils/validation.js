/**
 * Utilitaires de validation pour les formulaires
 * Fournit des fonctions de validation réutilisables
 */

/**
 * Valide une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si l'email est valide
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un mot de passe
 * @param {string} password - Le mot de passe à valider
 * @returns {object} - Objet avec isValid et message
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
  }
  if (!hasUpperCase) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  if (!hasLowerCase) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  if (!hasNumbers) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  if (!hasSpecialChar) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.join(', ')
  };
};

/**
 * Valide un numéro de téléphone
 * @param {string} phone - Le numéro de téléphone à valider
 * @returns {boolean} - True si le numéro est valide
 */
export const validatePhone = (phone) => {
  // Accepte les formats: +221 77 123 45 67, 0771234567, 77-123-45-67
  const phoneRegex = /^(\+221\s?)?(77|76|78|70)\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valide un nom (prénom ou nom de famille)
 * @param {string} name - Le nom à valider
 * @returns {boolean} - True si le nom est valide
 */
export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Valide une adresse
 * @param {string} address - L'adresse à valider
 * @returns {boolean} - True si l'adresse est valide
 */
export const validateAddress = (address) => {
  return address.trim().length >= 10 && address.trim().length <= 200;
};

/**
 * Valide un code postal
 * @param {string} postalCode - Le code postal à valider
 * @returns {boolean} - True si le code postal est valide
 */
export const validatePostalCode = (postalCode) => {
  const postalCodeRegex = /^\d{5}$/;
  return postalCodeRegex.test(postalCode);
};

/**
 * Valide un prix
 * @param {string|number} price - Le prix à valider
 * @returns {boolean} - True si le prix est valide
 */
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice >= 0;
};

/**
 * Valide une quantité
 * @param {string|number} quantity - La quantité à valider
 * @returns {boolean} - True si la quantité est valide
 */
export const validateQuantity = (quantity) => {
  const numQuantity = parseInt(quantity);
  return !isNaN(numQuantity) && numQuantity > 0 && numQuantity <= 999;
};

/**
 * Valide un titre de produit
 * @param {string} title - Le titre à valider
 * @returns {boolean} - True si le titre est valide
 */
export const validateProductTitle = (title) => {
  return title.trim().length >= 3 && title.trim().length <= 100;
};

/**
 * Valide une description de produit
 * @param {string} description - La description à valider
 * @returns {boolean} - True si la description est valide
 */
export const validateProductDescription = (description) => {
  return description.trim().length >= 10 && description.trim().length <= 1000;
};

/**
 * Valide un formulaire complet
 * @param {object} formData - Les données du formulaire
 * @param {object} validationRules - Les règles de validation
 * @returns {object} - Objet avec isValid et errors
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];

    // Validation required
    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} est requis`;
      isValid = false;
      return;
    }

    // Validation email
    if (rules.email && value && !validateEmail(value)) {
      errors[field] = 'Format d\'email invalide';
      isValid = false;
      return;
    }

    // Validation password
    if (rules.password && value) {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        errors[field] = passwordValidation.message;
        isValid = false;
        return;
      }
    }

    // Validation phone
    if (rules.phone && value && !validatePhone(value)) {
      errors[field] = 'Format de numéro de téléphone invalide';
      isValid = false;
      return;
    }

    // Validation minLength
    if (rules.minLength && value && value.length < rules.minLength) {
      errors[field] = `${field} doit contenir au moins ${rules.minLength} caractères`;
      isValid = false;
      return;
    }

    // Validation maxLength
    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors[field] = `${field} ne doit pas dépasser ${rules.maxLength} caractères`;
      isValid = false;
      return;
    }

    // Validation personnalisée
    if (rules.custom && value) {
      const customValidation = rules.custom(value);
      if (!customValidation.isValid) {
        errors[field] = customValidation.message;
        isValid = false;
        return;
      }
    }
  });

  return { isValid, errors };
};

/**
 * Nettoie et formate un numéro de téléphone
 * @param {string} phone - Le numéro de téléphone à formater
 * @returns {string} - Le numéro formaté
 */
export const formatPhoneNumber = (phone) => {
  // Supprime tous les caractères non numériques sauf le +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Si c'est un numéro sénégalais sans indicatif
  if (cleaned.startsWith('7') && cleaned.length === 9) {
    return `+221 ${cleaned}`;
  }
  
  // Si c'est un numéro sénégalais avec indicatif
  if (cleaned.startsWith('+221') && cleaned.length === 13) {
    return cleaned.replace(/(\+221)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  }
  
  return cleaned;
};

/**
 * Formate un prix avec la devise
 * @param {number} price - Le prix à formater
 * @param {string} currency - La devise (par défaut: XOF)
 * @returns {string} - Le prix formaté
 */
export const formatPrice = (price, currency = 'XOF') => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return '0 XOF';
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
};

/**
 * Valide une image
 * @param {File} file - Le fichier image à valider
 * @returns {object} - Objet avec isValid et message
 */
export const validateImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { isValid: false, message: 'Aucun fichier sélectionné' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: 'Format d\'image non supporté. Utilisez JPEG, PNG ou WebP' };
  }

  if (file.size > maxSize) {
    return { isValid: false, message: 'La taille du fichier ne doit pas dépasser 5MB' };
  }

  return { isValid: true, message: 'Image valide' };
};

/**
 * Génère un message d'erreur personnalisé
 * @param {string} fieldName - Le nom du champ
 * @param {string} errorType - Le type d'erreur
 * @returns {string} - Le message d'erreur
 */
export const getErrorMessage = (fieldName, errorType) => {
  const messages = {
    required: `${fieldName} est requis`,
    email: 'Format d\'email invalide',
    password: 'Le mot de passe ne respecte pas les critères de sécurité',
    phone: 'Format de numéro de téléphone invalide',
    minLength: `${fieldName} est trop court`,
    maxLength: `${fieldName} est trop long`,
    invalid: `${fieldName} est invalide`
  };

  return messages[errorType] || `${fieldName} contient une erreur`;
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateAddress,
  validatePostalCode,
  validatePrice,
  validateQuantity,
  validateProductTitle,
  validateProductDescription,
  validateForm,
  formatPhoneNumber,
  formatPrice,
  validateImage,
  getErrorMessage
}; 