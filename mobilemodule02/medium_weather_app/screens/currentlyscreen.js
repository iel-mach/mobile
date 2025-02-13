import { StyleSheet, Text, View } from 'react-native';
import { useMyContext } from '../Context';
import react, { useEffect, useState} from 'react';
import {WeatherData} from '../api/api.js'

export default function CurrentlyScreen() {
    const {citycoords, showContent, errorMsg, weather} = useMyContext()
    WeatherData();
    return(
        <View style={styles.container}>
            {showContent ? (
             errorMsg ? ( 
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
                <View>
                <Text style={styles.textcontainer}>{citycoords.city}</Text>
                <Text style={styles.textcontainer}>{citycoords.region}</Text>
                <Text style={styles.textcontainer}>{citycoords.country}</Text>
                {weather ? (
                  <View>
                    <Text style={styles.textcontainer}>{weather.current.temperature_2m} {weather.current_units.temperature_2m}</Text>
                    <Text style={styles.textcontainer}>{weather.current.weather_code} {weather.current_units.weather_code}</Text>
                    <Text style={styles.textcontainer}>{weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</Text>
                  </View>
                ) : (<></>)
                }
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