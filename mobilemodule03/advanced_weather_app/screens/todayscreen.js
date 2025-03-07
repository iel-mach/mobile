import { Dimensions, StyleSheet, Text, View, FlatList, ImageBackground,Image } from 'react-native';
import { useMyContext } from '../Context';
import {LineChart} from "react-native-chart-kit";
import {getWeatherDescription, mapimagePath} from '../utils/utils.js'

export default function TodayScreen() 
{
  const {weatherhourly, citycoords, showContent, errorMsg}  = useMyContext()
  return(
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {showContent ? 
        (
          errorMsg ? 
          ( 
            <View style={styles.showerror}>
              <Text style={styles.error}>{errorMsg}</Text>
            </View>
          ) : 
          (
            weatherhourly ? 
            (
              <View style={styles.showContent}>
                <View style={styles.city}>
                  <Text style={styles.textcity}>{citycoords?.city}</Text>
                  <Text style={styles.text}>{citycoords?.region}, {citycoords?.country}</Text>
                </View>
                <View style={styles.wh}>
                  <Text style={styles.charttext}>Today temperatures</Text>
                  <LineChart
                    data=
                    {
                      {
                        labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
                        datasets: 
                        [
                          {
                            data: weatherhourly?.hourly?.temperature_2m,
                            color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`
                          },
                        ]
                      }
                    }
                    width={Dimensions.get("window").width - 20}
                    height={220}
                    yAxisSuffix="°C"
                    segments={8}
                    yAxisInterval={1}
                    fromZero
                    chartConfig=
                    {
                      {
                        backgroundColor: 'transparent',
                        backgroundGradientFrom: 'transparent',
                        backgroundGradientTo: 'transparent',
                        decimalPlaces: 0,
                        color: (opacity = 1) =>  `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: 
                        {
                          borderRadius: 16,
                        },
                        propsForDots: 
                        {
                          r: "4",
                          strokeWidth: "2",
                        }
                      }
                    }
                    bezier
                    style=
                    {
                      {
                        marginVertical: 'auto',
                        borderRadius: 10,
                        marginLeft : 10,
                      }
                    }
                  />
                </View>
                <View style={styles.fot}>
                  <View style={styles.textl}>
                    <FlatList
                      style={styles.flatlist}
                      data={weatherhourly?.hourly?.time}
                      renderItem={({item, index}) => {
                        return(
                          <View style={styles.weathercontainer}>
                            <Text style={styles.weathertext}>{item?.split("T")[1]}</Text>
                            <Text style={styles.temperature}>{weatherhourly?.hourly?.temperature_2m[index]} {weatherhourly?.hourly_units?.temperature_2m}</Text>
                            <Image source={mapimagePath[getWeatherDescription(weatherhourly?.hourly?.weather_code[index])]} style={styles.icon} />
                            <View style={styles.windcontainer}>
                              <Image source={require('../assets/wind_white.png')} style={styles.windicon} />
                              <Text style={styles.weathertext}>{weatherhourly?.hourly?.wind_speed_10m[index]} {weatherhourly?.hourly_units?.wind_speed_10m}</Text>
                            </View>
                          </View>
                        )
                      }}
                      keyExtractor={(item) => item}
                      horizontal={true}
                    />
                  </View>
                </View>
              </View>
            ) : 
            (
              <Text style={styles.isloading}>Data has been loaded! ....</Text>
            )
          )
        ) : 
        (
          null
        )
        }
      </View>
    </ImageBackground>
  )
}
  
const styles = StyleSheet.create({
  background: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city : 
  {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcity : 
  {
    fontSize: 30,
    color: '#1E90FF',
    textAlign: 'center',
  },
  text : 
  {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
  },
  wh : 
  {
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    flex : 2,
  },
  charttext : 
  {
    marginTop : 5,
    marginBottom : 5,
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
  },
  icon : 
  {
    width: 30,
    height: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  fot : 
  {
    flex : 2,
    marginBottom: 30,
    justifyContent: 'center',
  },
  temperature : 
  {
    fontSize: 18,
    color : "#FF8C00",
    marginBottom: 10,
  },

  weathercontainer : 
  {
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weathertext : 
  {
    marginTop : 10,
    marginBottom: 10,
    color: "#fff",
    fontSize: 16,
  },
  windcontainer: 
  {
    flexDirection: 'row',
  },
  windicon : 
  {
    marginRight: '5',
    marginTop: 12,
    width: 18,
    height: 18,
  },
  textl : 
  {
    marginHorizontal: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    marginLeft: 10,
  },
  isloading : 
  {
    fontSize: 40,
    fontWeight: "800",
    color: 'gray',
  },
  error : 
  {
    fontSize: 20,
    fontWeight: "800",
    color: "red",
    textAlign: 'center',
  },
});