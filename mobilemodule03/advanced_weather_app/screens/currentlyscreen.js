import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
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
            {showContent ? (
             errorMsg ? (
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
              <View style={styles.showContent}>
                  <Text style={styles.city}>{citycoords.city}</Text>
                  <Text style={styles.textcontainer}>{citycoords.region}, {citycoords.country}</Text>
                {weather ? (
                  <View style={styles.weathercontainer}>
                    <Text style={styles.temperature}>{weather?.current?.temperature_2m}{weather?.current_units?.temperature_2m}</Text>
                    <Text style={styles.textcontainer}>{getWeatherDescription(weather?.current?.weather_code)}</Text>
                    <Image source={require('../sun.png')} style={styles.icon} />
                    <View style={styles.windcontainer}>
                      <Image source={require('../wind.png')} style={styles.windicon} />
                      <Text style={styles.textcontainer}>{weather?.current?.wind_speed_10m} {weather?.current_units?.wind_speed_10m}</Text>
                    </View>
                  </View>
                ) : (<></>)
                }
              </View>
            )
            ) : null}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weathercontainer: {
    flex: 1,
    paddingTop: '70',
    alignItems: 'center',
  },
  city : {
    paddingTop: 30,
    fontSize: 30,
    color: '#7B68EE',
    textAlign: 'center',
  },
  textcontainer: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
  },
  icon : {
    // color: 'blue',
    width: 100,
    height: 100,
    marginTop: 5,
    marginBottom: 30,
  },
  temperature : {
    fontSize: 50,
    color : "#FF8C00",
    marginTop: 10,
    marginBottom: 50,
  },
  windcontainer: {
    // alignItems: 'center',
    flexDirection: 'row',
    // margin: 'auto',
  },
  windicon : {
    // paddingRight: 15,
    marginRight: '5',
    width: 30,
    height: 30,

  },
  showerror : {
    // width : '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // top: 0, 
    // left: 0, 
    // right: 0, 
    // bottom: 0, 
  },
  error : {
    fontSize: 20,
    fontWeight: "800",
    color: "red",
    textAlign: 'center',
  }
  });