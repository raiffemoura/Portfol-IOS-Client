import React from 'react';
import { Link } from "react-router-dom";
const HomeButton = () => {
    return ( 
        <div className="home-button">
            <Link to={"/"}><button className="back-btn"> </button></Link>
        </div>
     );
}
 
export default HomeButton;