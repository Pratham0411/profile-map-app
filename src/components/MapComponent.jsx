


import React, { useEffect, useState } from 'react';

const MapComponent = ({ address }) => {
  const [mapUrl, setMapUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      setError('');

      if (address) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
          const data = await response.json();

          if (data.length > 0) {
            const location = data[0];
            const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.boundingbox[2]},${location.boundingbox[0]},${location.boundingbox[3]},${location.boundingbox[1]}&layer=mapnik&marker=${location.lat},${location.lon}`;
            setMapUrl(mapEmbedUrl);
          } else {
            setError('Location not found.');
            setMapUrl(''); // Clear the map URL if no location is found
          }
        } catch (err) {
          setError('Error fetching location data.');
          console.error(err);
        }
      } else {
        setError('No address provided.');
      }

      setLoading(false);
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {loading && <p>Loading map...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mapUrl && (
        <iframe
          title="OpenStreetMap"
          src={mapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MapComponent;








