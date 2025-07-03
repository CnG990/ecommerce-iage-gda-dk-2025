import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Button from '../components/common/Button';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postal_code: user.postal_code || '',
        country: user.country || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.updateProfile(formData);
      setIsEditing(false);
      // Optionnel : recharger l'utilisateur depuis l'API
      // window.location.reload();
    } catch (error) {
      // Gérer l'erreur si besoin
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veuillez vous connecter pour accéder à votre profil.</h1>
          <Button
            onClick={() => navigate('/login?redirect=/profile')}
            className="px-6 py-2 font-semibold"
          >
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-primary-600 mb-6 text-center">Mon Profil</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ville</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Code postal</label>
              <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pays</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            {isEditing ? (
              <>
                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)} disabled={loading}>Annuler</Button>
                <Button type="submit" loading={loading} disabled={loading}>Enregistrer</Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>Modifier</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 