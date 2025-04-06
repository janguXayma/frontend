import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useClassServices } from "../../services/useClassServices";
import AuthContext from "../../context/Authcontext";

const Profile = () => {
  const navigate = useNavigate();
  const { profileUser, updateUserProfile } = useClassServices();
  const { data: userInfo, isLoading, isError, error } = profileUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const {user} = useContext(AuthContext);
  const status = user?.role === "teacher" ? "Teacher" : "Student";

  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username || "",
        email: userInfo.email || "",
        full_name: userInfo.full_name || "",
        bio: userInfo.bio || "",
        phone_number: userInfo.phone_number || "",
        location: userInfo.location || "",
        birth_date: userInfo.birth_date?.split('T')[0] || "",
        gender: userInfo.gender || ""
      });
    }
  }, [userInfo]);

  const handleEditToggle = () => setIsEditing(!isEditing);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formPayload = new FormData();
    
    // Ajout des champs standards
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formPayload.append(key, value);
    });
    
    // Ajout de l'image si elle existe
    if (avatarFile) {
      formPayload.append('photo', avatarFile);
    }
    
    updateUserProfile.mutate(formPayload);
  };

  if (isLoading) return <div className="text-center mt-8">Chargement...</div>;
  if (isError) return <div className="text-error text-center mt-8">{error?.message}</div>

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-start mb-8">
              <h1 className="card-title text-3xl">
                Profil de {userInfo?.username}
                <div className="badge badge-accent">{status}</div>
              </h1>
              <button 
                onClick={handleEditToggle}
                className="btn btn-outline btn-accent"
                disabled={updateUserProfile.isLoading}
              >
                {isEditing ? 'Annuler' : 'Modifier le profil'}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Section Photo de profil */}
                <div className="flex-shrink-0">
                  <div className="avatar">
                    <div className="w-48 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                      <img 
                        src={avatarPreview || (userInfo?.photo || "/logo.png")} 
                        alt="Avatar" 
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-4">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                      />
                    </div>
                  )}
                </div>

                {/* Section Informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {/* Nom complet */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nom complet</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="input input-bordered input-accent mx-2 gap-2"
                        placeholder="Non renseigné"
                      />
                    ) : (
                      <p className="text-lg">{formData.full_name || "Non renseigné"}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input input-bordered input-accent mx-2 gap-2"
                      />
                    ) : (
                      <p className="text-lg">{formData.email}</p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Téléphone</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="input input-bordered input-accent mx-2 gap-2"
                        placeholder="Non renseigné"
                      />
                    ) : (
                      <p className="text-lg">{formData.phone_number || "Non renseigné"}</p>
                    )}
                  </div>

                  {/* Date de naissance */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date de naissance</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                        className="input input-bordered input-accent mx-2 gap-2"
                      />
                    ) : (
                      <p className="text-lg">
                        {formData.birth_date || "Non renseignée"}
                      </p>
                    )}
                  </div>

                  {/* Genre */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Genre</span>
                    </label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="select select-bordered select-accent mx-2 gap-2"
                      >
                        <option value="">Non spécifié</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                        <option value="other">Autre</option>
                      </select>
                    ) : (
                      <p className="text-lg">
                        {formData.gender === "male" && "Homme"}
                        {formData.gender === "female" && "Femme"}
                        {formData.gender === "other" && "Autre"}
                        {!formData.gender && "Non spécifié"}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Bio</span>
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="textarea textarea-bordered h-24 textarea-accent mx-2 gap-2"
                        placeholder="Décrivez-vous en quelques mots..."
                      />
                    ) : (
                      <p className="text-lg whitespace-pre-line">
                        {formData.bio || "Aucune bio renseignée"}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4 mt-8">
                  <button
                    type = "submit"
                    className="btn btn-accent"
                    disabled={updateUserProfile.isLoading}
                  >
                    {updateUserProfile.isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Enregistrement...
                      </>
                    ) : (
                      'Enregistrer les modifications'
                    )}
                  </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;