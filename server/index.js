

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Add CORS middleware

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS for the frontend to communicate with the backend

// Correct path to profiles.json
const profilesFilePath = path.join(__dirname, '../src/data', 'profiles.json');

// Helper to read profiles from file
const readProfiles = () => {
  try {
    const profiles = fs.readFileSync(profilesFilePath, 'utf8');
    return JSON.parse(profiles);
  } catch (error) {
    console.error('Error reading profiles:', error);
    return [];
  }
};

// Helper to write profiles to file
const writeProfiles = (profiles) => {
  try {
    fs.writeFileSync(profilesFilePath, JSON.stringify(profiles, null, 2));
  } catch (error) {
    console.error('Error writing profiles:', error);
  }
};

// API Endpoints

// Get all profiles
app.get('/api/profiles', (req, res) => {
  try {
    const profiles = readProfiles();
    res.json(profiles);
  } catch (error) {
    console.error('Error reading profiles:', error);
    res.status(500).send('Failed to read profiles');
  }
});

// Add a new profile
app.post('/api/profiles', (req, res) => {
  try {
    const profiles = readProfiles();
    const newProfile = req.body;
    newProfile.id = profiles.length + 1; // Add a new ID
    profiles.push(newProfile);
    writeProfiles(profiles);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error adding profile:', error);
    res.status(500).send('Failed to add profile');
  }
});

// Update an existing profile
app.put('/api/profiles/:id', (req, res) => {
  try {
    const profiles = readProfiles();
    const { id } = req.params;
    const updatedProfile = req.body;

    const index = profiles.findIndex((profile) => profile.id === parseInt(id));
    if (index !== -1) {
      profiles[index] = { ...updatedProfile, id: parseInt(id) };
      writeProfiles(profiles);
      res.json(profiles[index]);
    } else {
      res.status(404).send('Profile not found');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Failed to update profile');
  }
});

// Delete a profile
app.delete('/api/profiles/:id', (req, res) => {
  try {
    const profiles = readProfiles();
    const { id } = req.params;
    const updatedProfiles = profiles.filter((profile) => profile.id !== parseInt(id));
    writeProfiles(updatedProfiles);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).send('Failed to delete profile');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});











