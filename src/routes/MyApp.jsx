import React from 'react';
import Header from '../components/Header';
import AppsScreen from '../components/AppsScreen';
import Pages from '../components/Pages';
import { PageProvider } from '../context/PageContext';
import AppsBottom from '../components/AppsBottom';



const Background = () => {
    return ( 
        <div className='container'>
            <div>
                <div className="screen">
                    <Header />
                    <PageProvider>
                        <AppsScreen />
                        <Pages />
                    </PageProvider>
                    <AppsBottom />

                </div>
            </div>
            
        </div>
        
     );
}
 
export default Background;