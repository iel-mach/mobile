import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Location from 'expo-location';


const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
}

export const MyProvider = ({ children }) => {
    const [data, setData] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [mylocation, setMyocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showContent, setShowContent] = useState(true);
    const [citycoords, setCitycoords] = useState("")
    const [weather, setWeather] = useState("");


    async function getMyLocation() {
        
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('geolocation is not available please enable it in you settings');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setMyocation({
        lt: location.coords.latitude,
        lg: location.coords.longitude,
      })
      
      const reversecode = await Location.reverseGeocodeAsync({
        longitude : mylocation.lg,
        latitude : mylocation.lt,
      });
      setMyocation({
        ...mylocation,
        city: reversecode[0].city,
        country : reversecode[0].country,
        region : reversecode[0].region,
      });
      // console.log(reversecode[0].city);
      // console.log('===>', mylocation);
    }

    useEffect(() => {
      getMyLocation();
    }, [])
  
    return (
      <MyContext.Provider value={{setWeather, weather , getMyLocation, citycoords, setCitycoords, setShowContent, showContent, data, setData, setErrorMsg, errorMsg, searchQuery, setSearchQuery,setMyocation, mylocation}}>
        {children}
      </MyContext.Provider>
    );
};