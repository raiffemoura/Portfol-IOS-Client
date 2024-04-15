import React from 'react'
import { Link } from 'react-router-dom'
import arrowBackBlack from '../../assets/icons/arrow-back-black.png';
import locationImg from '../../assets/icons/location-img.png';
import moreIcon from '../../assets/icons/more-icon.png';
import switchIcon from '../../assets/icons/switch-icon.png';

const GoogleMapsHeader = () => {
    return ( 
        <div className='map-header'>
        <div className='map-header-icon-start'>
            <Link to={"/"}> <img id='arrow-back' src={arrowBackBlack} srcset="" /> </Link>
            <img id='location-icon' src={locationImg} alt="" /> 

        </div>
        <div className='map-header-icon-center'>
            {/* <input className='map-input' type="text" placeholder='Your location' />
            <input className='map-input' type="text" placeholder='Choose destination' /> */}

        </div>
        <div className='map-header-icon-end'>
            <button><img id='more-icon' src={moreIcon} alt="" srcset="" /></button>

            <button><img id="switch-icon" src={switchIcon} alt="" srcset="" /></button>
        </div>
    </div >
     );
}
 
export default GoogleMapsHeader;