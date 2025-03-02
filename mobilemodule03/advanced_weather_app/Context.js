import React, { createContext, useState, useContext, useEffect } from 'react';
// import {WeatherData} from './api/api'
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
    const [weatherhourly, setWeatHerhourly] = useState("");


    async function getMyLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("/////",status);
      if (status !== 'granted') {
        setErrorMsg('geolocation is not available please enable it in you settings');
        return;
      }
      // await requestPermissions();
      // let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      // let location = await Location.getCurrentPositionAsync({});
      // console.log("\\\\\\",location);
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000
      });
      // console.log({ location })
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
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${citycoords.lt}&longitude=${citycoords.lg}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${citycoords.timezone}`
        );
        if (!response.ok) {
          throw new Error('The service connection is lost,  please check your internet connection or try again later');
        }
        const data = await response.json();
        setWeather(data);
        
      }catch (err) {
        setError(err.message);
      }
    }
    
    const WeatherDatahourly = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${citycoords.lt}&longitude=${citycoords.lg}&hourly=temperature_2m,wind_speed_10m&forecast_days=1`
        );
        if (!response.ok) {
          throw new Error('The service connection is lost,  please check your internet connection or try again later');
        }
        const data = await response.json();
        setWeatHerhourly(data);
      }
      catch (err) {
        setError(err.message);
      }
    }
    
    useEffect(() => {
      getMyLocation();
      // console.log("====>", citycoords);
    }, [])
    
    useEffect (() => {
      getMyCoords();
    }, [mylocation])
    
    useEffect (() => {
      WeatherData();
      WeatherDatahourly();
      setShowContent(true);
    }, [citycoords])
    
    return (
      <MyContext.Provider value={{weatherhourly, getMyCoords, setWeather, weather , getMyLocation, citycoords, setCitycoords, setShowContent, showContent, data, setData, setErrorMsg, errorMsg, searchQuery, setSearchQuery,setMyocation, mylocation}}>
        {children}
      </MyContext.Provider>
    );
};