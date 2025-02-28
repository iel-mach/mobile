import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {getWeatherDescription} from '../utils/utils.js'
import { useMyContext } from '../Context';
import { BlurView } from '@react-native-community/blur';
// import react, { useEffect, useState} from 'react';
// import {WeatherData} from '../api/api.js'

export default function CurrentlyScreen() {
    const {citycoords, showContent, errorMsg, weather} = useMyContext()
    return(
      <ImageBackground
        source={require('../background.jpg')}
        style={styles.background}
      >
        <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
      />
        <View style={styles.container}>
            {showContent ? (
             errorMsg ? (
              <View style={styles.showerror}>
                <Text style={styles.error}>{errorMsg}</Text>
              </View>
            ) : (
              <View style={styles.showContent}>
                <Text style={styles.textcontainer}>{citycoords.city}</Text>
                <Text style={styles.textcontainer}>{citycoords.region}</Text>
                <Text style={styles.textcontainer}>{citycoords.country}</Text>
                {weather ? (
                  <View>
                    <Text style={styles.textcontainer}>{weather?.current?.temperature_2m} {weather?.current_units?.temperature_2m}</Text>
                    <Text style={styles.textcontainer}>{getWeatherDescription(weather?.current?.weather_code)}</Text>
                    <Text style={styles.textcontainer}>{weather?.current?.wind_speed_10m} {weather?.current_units?.wind_speed_10m}</Text>
                  </View>
                ) : (<></>)
                }
              </View>
            )
            ) : (<></>)}
        </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Make sure the background image covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject, // Make the blur cover the whole screen
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  showContent : {
    // alignItems: 'center',
    paddingTop: 30,
  },
  textcontainer: {
    fontSize: 20,
    textAlign: 'center',
  },
  showerror : {
    width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
  },
  error : {
    fontSize: 20,
    fontWeight: "800",
    color: "red",
    textAlign: 'center',
  }
  });