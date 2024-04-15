import React from 'react'
import Header from '../components/Header';
import Notes from '../components/Notes';
import HomeButton from '../components/HomeButton';
import '../styles/notes.css'

const NotesPage = () => {
    return (    
    <div className='container-notes'>
        <div>
            <div className="screen">
                <Header />
                <Notes/>
                <HomeButton />
            </div>
        </div>
        
    </div> 
);
}
 
export default NotesPage;