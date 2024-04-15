import React, { useState, useEffect } from 'react';
import Notifications from './Noifications';
import iconConfig from './iconConfig';
    

const HeaderBlack = () => {
    const [currentTime, setCurrentTime] = useState('');

useEffect(() => {


    setInterval(
      () => {
        let hours = new Date().getHours();
        (hours < 10) && (hours = `0${hours}`);
  
        let min = new Date().getMinutes();
        (min < 10) && (min = `0${min}`);
  
        setCurrentTime(
          `${hours}:${min}`
        );
      },
      
    );
  }, []);
    return ( 
        <div className='header black-text'>
            <div id='time'>{currentTime}</div>
            <div className='header-camera'>
            <Notifications />

            </div>
            <div className='header-icons'>
                <img src={iconConfig.signalBlack} alt="signal reception icon" />
                <img src={iconConfig.wifiBlack} alt="wifi icon" />
                <img src={iconConfig.battery} alt="battery icon" />
            </div>
        </div>
     );
}
 
export default  HeaderBlack;