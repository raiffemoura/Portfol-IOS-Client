import React from 'react';
import { Link } from 'react-router-dom';

const BoxError = () => {
    return ( 
        <div className='box'>
            <div>
                <h2>Error 404! </h2>
            </div>
            <div>
                <p>Page not found.</p>
            </div>
            <div className='box-btn'>
                <div className='box-btn-left'>
                   <Link to='/'> 
                        <h4>Cancel</h4>
                    </Link>
                </div>
                <div className='box-btn-right'>
                    <Link to='/'>
                        <h4 >Try Again</h4>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default BoxError;