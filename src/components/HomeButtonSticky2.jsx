import React from 'react';
import { Link } from "react-router-dom";
const HomeButtonSticky2 = () => {
    return ( 
        <div className="home-button-sticky2">
            <Link to={"/"}><button className="back-btn"> </button></Link>
        </div>
     );
}
 
export default HomeButtonSticky2;