import React, { useState, createContext } from "react";


 
export const PageContext = createContext();

export function PageProvider(props) {
  const [isFirstPage, setIsFirstPage] = useState(true);


  return (
    <PageContext.Provider value={[isFirstPage, setIsFirstPage]}>
      {props.children}
    </PageContext.Provider>
  );
}