import React, { createContext, useState, useContext, useEffect } from 'react';
import {WeatherData} from './api/api'
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
    }
    
    const getMyCoords = async () => {
      const reversecode = await Location.reverseGeocodeAsync({
        longitude : mylocation.lg,
        latitude : mylocation.lt,
      });
      // console.log("reversecode ==> ", reversecode)
      setCitycoords({
        lt: mylocation.lt,
        lg: mylocation.lg,
        city: reversecode[0].city,
        country : reversecode[0].country,
        region : reversecode[0].region,
        timezone : "US/Mountain",
      })
    }

    const WeatherData = async () => {
      try {
        // Fetching the data from the API
        const response = await fetch(
          
          `https://api.open-meteo.com/v1/forecast?latitude=${citycoords.lt}&longitude=${citycoords.lg}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // console.log("lt ==> ", data)
        setWeather(data);
          // console.log('Weather data:', data);
          // console.log('Weather time:', data.hourly.time[0]);
  
        }catch (err) {
          setError(err.message);
        }
  }

    useEffect(() => {
      getMyLocation();
    }, [])
    
    useEffect (() => {
      getMyCoords();
    }, [mylocation])
    
    useEffect (() => {
      WeatherData();
      // console.log("hola");
      setShowContent(true);
      // getMyCoords();
    }, [citycoords])
  
    return (
      <MyContext.Provider value={{getMyCoords, setWeather, weather , getMyLocation, citycoords, setCitycoords, setShowContent, showContent, data, setData, setErrorMsg, errorMsg, searchQuery, setSearchQuery,setMyocation, mylocation}}>
        {children}
      </MyContext.Provider>
    );
};