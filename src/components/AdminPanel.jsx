



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import


const AdminPanel = ({ profiles, setProfiles }) => {

  const navigate = useNavigate();  // Using useNavigate hook

  const handlProfileClick = () => {
    navigate('/profile');  // Navigate to profile page 
  };

  const [newProfile, setNewProfile] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
  });
  const [editProfileId, setEditProfileId] = useState(null);

  // Memoize the fetchProfiles function to avoid missing dependency warnings
  const fetchProfiles = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profiles');
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  }, [setProfiles]);

  // Fetch all profiles (initial loading)
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProfileId !== null) {
      // Editing an existing profile
      const updatedProfile = { ...newProfile, id: editProfileId };
      await updateProfileOnServer(editProfileId, updatedProfile);
      setProfiles(profiles.map((profile) =>
        profile.id === editProfileId ? updatedProfile : profile
      ));
    } else {
      // Adding a new profile
      const addedProfile = { ...newProfile, id: profiles.length + 1 };
      await addProfileToServer(addedProfile);
      setProfiles([...profiles, addedProfile]);
    }
    setNewProfile({ name: '', photo: '', description: '', address: '' });
    setEditProfileId(null); // Clear edit mode
  };

  const handleEdit = (profile) => {
    setNewProfile(profile); // Populate form with existing profile data
    setEditProfileId(profile.id); // Set the profile we're editing
  };

  const handleDelete = async (id) => {
    await deleteProfileFromServer(id);
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  // API calls to interact with the backend
  const addProfileToServer = async (profile) => {
    try {
      const response = await fetch('http://localhost:5000/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error('Failed to add profile');
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const updateProfileOnServer = async (id, updatedProfile) => {
    try {
      const response = await fetch(`http://localhost:5000/api/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      if (!response.ok) throw new Error('Failed to update profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const deleteProfileFromServer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/profiles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete profile');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProfile.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newProfile.photo}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProfile.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newProfile.address}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editProfileId ? 'Update Profile' : 'Add Profile'}</button>
      </form>

      {/* Profile List */}
      <div className="profile-button">
        <button onClick={handlProfileClick}>Profile List</button>
      </div>

      <div className="profiles-list">

        <h3>Existing Profiles</h3>
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <img src={profile.photo} alt={profile.name} width={50} height={50} />
              <p>{profile.name}</p>
              <p>{profile.description}</p>
              <p>{profile.address}</p>
              <button onClick={() => handleEdit(profile)}>Edit</button>
              <button onClick={() => handleDelete(profile.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;




