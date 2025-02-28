import axios from 'axios';
import { useMyContext  } from '../Context';

export const getcities =  (searchQuery) => {

    const {setErrorMsg, setShowContent, setData} = useMyContext();
    let opt = {
        method : 'GET',
        url : 'https://geocoding-api.open-meteo.com/v1/search',
        params: {
          name: searchQuery,
          count: 5,
          language: 'en', 
        },
      }
      axios.request(opt).then((res) => 
      {
        if (res.data && res.data.results && res.data.results.length > 0)
        {
          setData(res?.data?.results)
          setErrorMsg("");
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
