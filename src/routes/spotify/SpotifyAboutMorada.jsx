import React from 'react';
import HeaderSpotify from '../../components/spotify/HeaderSpotify.jsx';
import AboutMorada from '../../components/spotify/AboutMorada.jsx';
import HomeButtonSticky2 from '../../components/HomeButtonSticky2.jsx';


const SpotifyAboutMorada = () => {
    return ( 
        <div className='container-spotify'>
            <div>
                <div className="screen">
                    <HeaderSpotify />
                    
                    <AboutMorada/>
                    <HomeButtonSticky2 />   

                </div>
            </div>
            
        </div>
        
     );
}
 
export default SpotifyAboutMorada;