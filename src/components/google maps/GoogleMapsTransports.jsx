import React, { useState} from 'react';

import carIcon from '../../assets/icons/car-icon.png';
import carIconBlack from '../../assets/icons/car-icon-black.png';
import trainIcon from '../../assets/icons/train-icon.png';
import trainIconBlack from '../../assets/icons/train-icon-black.png';
import walkIcon from '../../assets/icons/walk-icon.png';
import walkIconBlack from '../../assets/icons/walk-icon-black.png';
import bikeIcon from '../../assets/icons/bike-icon.png';
import bikeIconBlack from '../../assets/icons/bike-icon-black.png';
import taxiIcon from '../../assets/icons/taxi-icon.png';
import taxiIconBlack from '../../assets/icons/taxi-icon-black.png';
import airplaneIcon from '../../assets/icons/airplane-icon.png';
import airplaneIconBlack from '../../assets/icons/airplane-icon-black.png';

const GoogleMapsTransports = () => {
    
    const itemsRef = React.useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedTransport, setSelectedTransport] = useState('car');
    
    const handleTransportSelect = (transport) => {
        setSelectedTransport(transport);
    }

   

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);

    }
    const handleMouseLeave = () => {
        setIsMouseDown(false);
    }
    const handleMouseUp = () => {
        setIsMouseDown(false);
    }
    const handleMouseMove = (e) => {
        if(!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 1; //adjust the speed
        itemsRef.current.scrollLeft = scrollLeft - walk;
    }

    return ( 
        <div className='map-transport-container '
        ref={itemsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
                    <button onClick={() => handleTransportSelect('car')} className={selectedTransport === 'car' ? 'map-transport-selected' : 'map-transport'}>
                    <img src={selectedTransport === 'car' ? carIcon : carIconBlack} alt="" />
                <p>3 min</p>
            </button>
            <button onClick={() => handleTransportSelect('train')} className={selectedTransport === 'train' ? 'map-transport-selected' : 'map-transport'}>
            <img src={selectedTransport === 'train' ? trainIcon : trainIconBlack} alt="" />
                <p>--</p>
            </button>
            <button onClick={() => handleTransportSelect('walk')} className={selectedTransport === 'walk' ? 'map-transport-selected' : 'map-transport'}>
            <img src={selectedTransport === 'walk' ? walkIcon : walkIconBlack} alt="" />
                <p>3 min</p>
            </button>
            <button onClick={() => handleTransportSelect('taxi')} className={selectedTransport === 'taxi' ? 'map-transport-selected' : 'map-transport'}>
            <img src={selectedTransport === 'taxi' ? taxiIcon : taxiIconBlack} alt="" />
                <p>--</p>
            </button>
            <button onClick={() => handleTransportSelect('bike')} className={selectedTransport === 'bike' ? 'map-transport-selected' : 'map-transport'}>
            <img src={selectedTransport === 'bike' ? bikeIcon : bikeIconBlack} alt="" />
                <p>1 min</p>
            </button>
            <button onClick={() => handleTransportSelect('airplane')} className={selectedTransport === 'airplane' ? 'map-transport-selected' : 'map-transport'}>
            <img src={selectedTransport === 'airplane' ? airplaneIcon : airplaneIconBlack} alt="" />
                <p>--</p>
            </button>
                   


              
                    
                </div>
     );
}
 
export default GoogleMapsTransports;