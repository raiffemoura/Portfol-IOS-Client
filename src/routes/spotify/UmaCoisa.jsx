import React from 'react';
import HeaderSpotify from '../../components/spotify/HeaderSpotify.jsx';
import SpotifyUmaCoisa from '../../components/spotify/SpotifyUmaCoisa.jsx';
import HomeButtonSticky2 from '../../components/HomeButtonSticky2.jsx';


const UmaCoisa = () => {
    return ( 
        <div className='container-spotify'>
            <div>
                <div className="screen"> 
                    <HeaderSpotify />                
                    <SpotifyUmaCoisa/>    
                    <HomeButtonSticky2 />
                </div>
            </div>
            
        </div>
        
     );
}
 
export default UmaCoisa;