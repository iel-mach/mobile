import axios from 'axios';
import { useMyContext  } from '../Context';

export const getcities =  (searchQuery) => {

    const {setShowContent, setData, citycoords} = useMyContext();
    let opt = {
        method : 'GET',
        url : 'https://geocoding-api.open-meteo.com/v1/search',
        params: {
          name: searchQuery,
          count: 10,
          language: 'en', 
        },
      }
      axios.request(opt).then((res) => 
      {
        if (res.data && res.data.results && res.data.results.length > 0)
        {
          setData(res?.data?.results)
        }
        else
        {
          setData("")
          if (!searchQuery)
            setShowContent(true)
        }
      }).catch((error) => {
        console.log('Error fetching location data');
        console.error(error);
      })
}


export const WeatherData = async () => {
    const {citycoords, setWeather} = useMyContext();
    try {
        // Fetching the data from the API
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${citycoords.lt}&longitude=${citycoords.lg}&current=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWeather(data);
        // console.log('Weather data:', data);
        // console.log('Weather time:', data.hourly.time[0]);

      }catch (err) {
        setError(err.message);
      }
}