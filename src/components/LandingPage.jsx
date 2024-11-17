


import React from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import

const LandingPage = () => {
  const navigate = useNavigate();  // Using useNavigate hook

  const handleAdminClick = () => {
    navigate('/admin');  // Navigate to Admin page
  };

  const handleUserClick = () => {
    navigate('/profile');  // Navigate to Members page (user section)
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h2>Welcome on Our Site..!</h2>
        <div className="buttons">
          <button onClick={handleAdminClick}>Admin</button>
          <button onClick={handleUserClick}>User</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;



