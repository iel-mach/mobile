import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
}

export const MyProvider = ({ children }) => {
    const [data, setData] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showContent, setShowContent] = useState(true);
  
    return (
      <MyContext.Provider value={{setShowContent, showContent, data, setData, setErrorMsg, errorMsg, searchQuery, setSearchQuery,setLocation, location}}>
        {children}
      </MyContext.Provider>
    );
};