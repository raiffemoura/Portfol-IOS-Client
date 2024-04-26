import React from 'react';
import HeaderSpotify from '../../components/spotify/HeaderSpotify.jsx';
import SpotifyUmaCoisa from '../../components/spotify/SpotifyUmaCoisa.jsx';

const UmaCoisa = () => {
  return (
    <div className="container-spotify">
      <div>
        <div className="screen">
          <HeaderSpotify />
          <SpotifyUmaCoisa />
        </div>
      </div>
    </div>
  );
};

export default UmaCoisa;
