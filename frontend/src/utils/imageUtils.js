const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getImageUrl = (imagePath) => {
  try {
    if (!imagePath) return '/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}/storage/products/${imagePath}`;
  } catch (error) {
    console.warn('Erreur lors du formatage de l\'image:', error);
    return '/placeholder.png';
  }
}; 