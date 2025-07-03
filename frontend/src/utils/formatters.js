/**
 * Formate un prix en FCFA
 * @param {number} price - Le prix à formater
 * @returns {string} Le prix formaté avec le symbole FCFA
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price) + ' FCFA';
};

/**
 * Formate un pourcentage
 * @param {number} value - La valeur à formater en pourcentage
 * @returns {string} La valeur formatée avec le symbole %
 */
export const formatPercentage = (value) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value) + ' %';
}; 