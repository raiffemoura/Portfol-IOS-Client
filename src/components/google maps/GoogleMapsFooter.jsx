import React from 'react'
import iconConfig from '../iconConfig';
const GoogleMapsFooter = () => {
    return ( <div className='map-footer-info'>
    <h1>1 min (1.5 km)</h1> 
    <p>Fastest route now due to traffic conditions</p>
    <div className='footer-btns'>

        <button className='footer-btn'>
            <img src={iconConfig.step} alt="steps"  />
            Steps</button> 
        <button className='footer-btn'>
            <img src={iconConfig.pin} alt="pin"  />
            Pin </button>
</div>  

</div> );
}
 
export default GoogleMapsFooter;