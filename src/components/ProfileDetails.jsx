


import React from 'react';
import { useParams } from 'react-router-dom';
import MapComponent from './MapComponent';

// const ProfileDetails = ({ profiles }) =>```javascript
const ProfileDetails = ({ profiles }) => {
  const { id } = useParams();
  const profile = profiles.find(p => p.id === parseInt(id));

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="profile-details">
      <h2>{profile.name}</h2>
      <img src={profile.photo} alt={profile.name} />
      <p>{profile.description}</p>
      <p>{profile.address}</p>
      <MapComponent address={profile.address} />
    </div>
  );
};

export default ProfileDetails;





