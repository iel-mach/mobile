import { StyleSheet, Text, View } from 'react-native';
import { useMyContext } from '../Context';
import react, { useEffect} from 'react';

export default function CurrentlyScreen() {
    const {citycoords, showContent, errorMsg} = useMyContext()
    useEffect(() => {
        // console.log(citycoords)
        async function fetchWeatherData() {
            try {
              // Fetching the data from the API
              const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${citycoords.latitude}&longitude=${citycoords.longitude}&hourly=temperature_2m`
              );
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const data = await response.json();
              console.log('Weather data:', data);
              // console.log('Weather time:', data.hourly.time[0]);
      
            }catch (err) {
              setError(err.message);
            }
          }
          fetchWeatherData();
    }, [citycoords])
    // console.log("city ==> ", citycoords)
    return(
        <View style={styles.container}>
            {showContent ? (
             errorMsg ? ( 
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
                <View>
                <Text style={styles.textcontainer}>{citycoords.name}</Text>
                <Text style={styles.textcontainer}>{citycoords.admin1}</Text>
                <Text style={styles.textcontainer}>{citycoords.country}</Text>
                </View>
            )
            ) : (<></>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 30,
    //   justifyContent: 'center',
    },
    textcontainer: {
        fontSize: 20,
        // fontWeight: "800",
        textAlign: 'center',
    },
    error : {
        fontSize: 20,
        fontWeight: "800",
        color: "red",
        textAlign: 'center',
    }
  });