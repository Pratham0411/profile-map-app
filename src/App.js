

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import AdminPanel from './components/AdminPanel';
import profilesData from './data/profiles.json';

const App = () => {
  const [profiles, setProfiles] = useState(profilesData);

  return (
    <Router>
      <div className="App">
        <h1>Profile Map Application</h1>
        <Routes>
          <Route path="/" element={<LandingPage />} />          
          <Route path="/admin" element={<AdminPanel profiles={profiles} setProfiles={setProfiles} />} />
          <Route path="/profile" element={<ProfileList profiles={profiles} />} />
          <Route path="/profile/:id" element={<ProfileDetails profiles={profiles} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;






