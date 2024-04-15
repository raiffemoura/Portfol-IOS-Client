import React from 'react';
import { Link } from 'react-router-dom';
import iconConfig from './iconConfig';
const AppsBottom = () => {
    function apps(app){
        return(
                <div className='img-hover'>
                    <img src={app} alt="{app}" /> 
                </div>
            
        )
    }
    return (
        <div className='apps-bottom'>
            <div className='apps-line'> 
                <Link to={"/Safari"}>
                {apps(iconConfig.safariApp, "Safari")}
                </Link>
                <Link to={"/Messages"}>

                {apps(iconConfig.messagesApp, "Messages")}
                </Link>

                <Link target='_blank' to={"http://wa.link/mbcvl1"}>
                    {apps(iconConfig.whatsApp, "Whatsapp")}
                </Link>
                <Link to={"/Phone"}>
                    {apps(iconConfig.phoneApp, "Phone")}
                </Link>
       
            </div>
        </div>
       )     
}
 
export default AppsBottom;