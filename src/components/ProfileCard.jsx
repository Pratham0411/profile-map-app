import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} />
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      <p>{profile.address}</p>
      <Link to={`/profile/${profile.id}`}>Summary</Link>
    </div>
  );
};

export default ProfileCard;








