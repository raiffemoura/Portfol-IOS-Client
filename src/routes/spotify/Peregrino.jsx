import React from 'react';
import HeaderSpotify from '../../components/spotify/HeaderSpotify.jsx';
import SpotifyPeregrino from '../../components/spotify/SpotifyPeregrino.jsx';
import '../../styles/spotify-peregrino.css';

const Spotify = () => {
  return (
    <div className="container-spotify">
      <div>
        <div className="screen">
          <HeaderSpotify />
          <SpotifyPeregrino />
        </div>
      </div>
    </div>
  );
};

export default Spotify;
