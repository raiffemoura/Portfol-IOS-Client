import React from 'react'
import { Link } from "react-router-dom";

const HomeeButtonBlack = () => {
    return ( 
        <div className="home-button-settings-black">
            <Link to={"/"}><button className="back-btn-settings-black"> </button></Link>
        </div>
     );
}
 
export default HomeeButtonBlack;