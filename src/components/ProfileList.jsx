

import React, { useState } from 'react';
import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // profile.adress.toLowerCase().includes(searchTerm.toLowerCase())
    (profile.address && profile.address.toLowerCase().includes(searchTerm.toLowerCase())) || // Check if address exists
    (profile.description && profile.description.toLowerCase().includes(searchTerm.toLowerCase())) // Check if address exists
  );


  return (
    <div className="profile-list">
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="profiles">
        {filteredProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileList;




