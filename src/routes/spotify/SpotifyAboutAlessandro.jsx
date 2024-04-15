import React from 'react';
import HeaderSpotify from '../../components/spotify/HeaderSpotify.jsx';
import AboutAlessandro from '../../components/spotify/AboutAlessandro.jsx';
import HomeButtonSticky2 from '../../components/HomeButtonSticky2.jsx';



const SpotifyAboutAlessandro = () => {
    return ( 
        <div className='container-spotify'>
            <div>
                <div className="screen">
                    <HeaderSpotify />
                    <AboutAlessandro/>   
                    <HomeButtonSticky2 />                 
                </div>
            </div>
            
        </div>
        
     );
}
 
export default SpotifyAboutAlessandro;