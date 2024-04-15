import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HomeButton from '../components/HomeButton'
import '../styles/settings.css'
import SettingsPage from '../components/SettingsPage'
import SettingsPageLight from '../components/SettingsPageLight.jsx'
import HeaderBlack from '../components/HeaderBlack';
import HomeButtonBlack from '../components/HomeButtonBlack.jsx';

const Settings = () => {
    const [theme, setTheme] = useState(localStorage.getItem('darkTheme') === 'true');

    useEffect(() => {
        localStorage.setItem('darkTheme', theme)
    }, [theme])
    return ( 
        
           
        <div className={`container-${theme ? 'dark' : 'light'}`}>
            <div>
                <div className="screen">
                    {theme ? <div>
                        <Header />
                        <SettingsPage setTheme={setTheme} /> 
                        <div className='adjust-settings-homebutton'>

                        <HomeButton />
                        </div>
                    </div>
                : 
                    <div>
                        <HeaderBlack />
                        <SettingsPageLight setTheme={setTheme} /> 
                        <div className='adjust-settings-homebutton'>
                            <HomeButtonBlack />
                        </div>
                  </div>
                }
                </div>
            </div>
            
        </div> 
    
);
}
 
export default Settings;