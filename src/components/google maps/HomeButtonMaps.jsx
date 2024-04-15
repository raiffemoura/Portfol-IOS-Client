import React from 'react';
import { Link } from "react-router-dom";
const HomeButtonMaps = () => {
    return ( 
        <div className="home-button-maps">
            <Link to={"/"}><button className="back-btn-maps"> </button></Link>
        </div>
     );
}
 
export default HomeButtonMaps;