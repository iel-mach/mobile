import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
}

export const MyProvider = ({ children }) => {
    const [golocation, setGeolocation] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState(null);
  
    return (
      <MyContext.Provider value={{ golocation, setGeolocation, searchQuery, setSearchQuery,setLocation, location}}>
        {children}
      </MyContext.Provider>
    );
};