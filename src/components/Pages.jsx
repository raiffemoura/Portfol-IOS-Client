import React, {useContext } from 'react';
import { PageContext } from '../context/PageContext';


const Pages = () => {
  
const [isFirstPage, setIsFirstPage] = useContext(PageContext);
  

  const handleClick = () => {
    setIsFirstPage(!isFirstPage);
   
  }


  return (<div className="pages">
  <div onClick={handleClick} className={`${isFirstPage ? "btn-slide-actived " : "btn-slide-disabled "}`}></div>
  <div onClick={handleClick} className={`${isFirstPage ? "btn-slide-disabled  " : "btn-slide-actived "}`}></div>

</div>)
}

export default Pages;


 
