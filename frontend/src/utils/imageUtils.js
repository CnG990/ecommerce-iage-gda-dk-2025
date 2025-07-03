const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.png';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_URL}/storage/products/${imagePath}`;
}; 