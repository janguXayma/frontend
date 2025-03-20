import React, { useContext, useState } from 'react';
import  AuthContext from '../../context/Authcontext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            janguXayma
          </span>
          <p className="mt-2 text-gray-600">Profil de l'utilisateur 🧑‍💼</p>
        </div>

        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Nom :</label>
            <input
              type="text"
              name="lastName"
              className="input input-bordered input-secondary"
              value={formData.lastName}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Prénom :</label>
            <input
              type="text"
              name="firstName"
              className="input input-bordered input-secondary"
              value={formData.firstName}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Nom d'utilisateur :</label>
            <input
              type="text"
              name="username"
              className="input input-bordered input-secondary"
              value={formData.username}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Email :</label>
            <input
              type="email"
              name="email"
              className="input input-bordered input-secondary"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Téléphone :</label>
            <input
              type="tel"
              name="phone"
              className="input input-bordered input-secondary"
              value={formData.phone}
              onChange={handleChange}
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
