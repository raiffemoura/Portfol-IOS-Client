import React from 'react';
import HeaderSpotify from '../../components/spotify/HeaderSpotify.jsx';
import SpotifyPeregrino from '../../components/spotify/SpotifyPeregrino.jsx';
import "../../styles/spotify-peregrino.css";
import HomeButtonSticky2 from '../../components/HomeButtonSticky2.jsx';




const Spotify = () => {
    return ( 
        <div className='container-spotify'>
            <div>
                <div className="screen">
                    <HeaderSpotify />
                    <SpotifyPeregrino/> 
                    <HomeButtonSticky2 />
                </div>
            </div>
            
        </div>
        
     );
}
 
export default Spotify;