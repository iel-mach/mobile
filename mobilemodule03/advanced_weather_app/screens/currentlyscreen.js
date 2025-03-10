import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import {getWeatherDescription, mapimagePath} from '../utils/utils.js'
import { useMyContext } from '../Context';

export default function CurrentlyScreen() {
    const {citycoords, showContent, errorMsg, weather} = useMyContext()
    return(
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}
      >
            {showContent ? 
            (
              errorMsg ? 
              (
                <Text style={styles.error}>{errorMsg}</Text>
              ) : 
              (
                weather ? 
                (
                  <View style={styles.showContent}>
                    <Text style={styles.city}>{citycoords.city}</Text>
                    <Text style={styles.textcontainer}>{citycoords.region}, {citycoords.country}</Text>
                    <View style={styles.weathercontainer}>
                      <Text style={styles.temperature}>{weather?.current?.temperature_2m}{weather?.current_units?.temperature_2m}</Text>
                      <Text style={styles.textcontainer}>{getWeatherDescription(weather?.current?.weather_code)}</Text>
                      <Image source={mapimagePath[getWeatherDescription(weather?.current?.weather_code)]} style={styles.icon} />
                      <View style={styles.windcontainer}>
                        <Image source={require('../assets/wind.png')} style={styles.windicon} />
                        <Text style={styles.textcontainer}>{weather?.current?.wind_speed_10m} {weather?.current_units?.wind_speed_10m}</Text>
                      </View>
                    </View>
                  </View>
                  
                ) : 
                (
                  <Text style={styles.isloading}>Data has been loaded! ....</Text>
                )
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
    color: '#1E90FF',
    textAlign: 'center',
  },
  textcontainer: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
  },
  icon : {
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
    flexDirection: 'row',
  },
  windicon : {
    marginRight: '5',
    width: 30,
    height: 30,
  },
  error : {
    fontSize: 20,
    fontWeight: "800",
    color: "red",
    textAlign: 'center',
  },
  isloading : {
    fontSize: 40,
    fontWeight: "800",
    color: 'gray',
  },
});