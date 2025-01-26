import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
}

export const MyProvider = ({ children }) => {
    const [golocation, setGeolocation] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <MyContext.Provider value={{ golocation, setGeolocation, searchQuery, setSearchQuery }}>
        {children}
      </MyContext.Provider>
    );
};