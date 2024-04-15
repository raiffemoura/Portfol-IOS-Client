import React from 'react';
import HeaderBlack from '../components/HeaderBlack';
import '../styles/GoogleMaps.css'
import GoogleMapsPage from '../components/google maps/GoogleMapsPage.jsx';



const GoogleMaps = () => {
    return ( 
        <div className='container-maps'>
            <div>
                <div className="screen">
                    <HeaderBlack />
                    <GoogleMapsPage />
                </div>
            </div>
            
        </div>
     );
}
 
export default GoogleMaps;