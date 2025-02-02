import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
}

export const MyProvider = ({ children }) => {
    // const [golocation, setGeolocation] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    return (
      <MyContext.Provider value={{setErrorMsg, errorMsg, searchQuery, setSearchQuery,setLocation, location}}>
        {children}
      </MyContext.Provider>
    );
};