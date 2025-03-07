import { StyleSheet, Text, View, FlatList, ImageBackground, Image, Dimensions } from 'react-native';
import { useMyContext } from '../Context';
import {getWeatherDescription, mapimagePath} from '../utils/utils.js'
import {LineChart} from "react-native-chart-kit";

export default function WeeklyScreen() {
    const {citycoords, showContent, errorMsg, weather} = useMyContext()
    const time = weather?.daily?.time.map(item => {
        return(
            `${item.split("-")[1]}/${item.split("-")[2]}`
        )
    })
    return(
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.background}
        >
            <View>
                {showContent ? 
                (
                    errorMsg ? 
                    ( 
                        <View style={styles.showerror}>
                            <Text style={styles.error}>{errorMsg}</Text>
                        </View>
                    ) :   
                    (
                        weather ? 
                        (
                            <View style={styles.showContent}>
                                <View style={styles.city}>
                                    <Text style={styles.textcity}>{citycoords?.city}</Text>
                                    <Text style={styles.text}>{citycoords?.region}, {citycoords?.country}</Text>
                                </View>
                                <View style={styles.wh}>
                                    <Text style={styles.charttext}>Weekly temperatures</Text>
                                    <LineChart
                                        data=
                                        {
                                            {
                                                labels: time,
                                                datasets: 
                                                [
                                                    {
                                                        data: weather?.daily?.temperature_2m_max,
                                                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                                    },
                                                    {
                                                        data: weather?.daily?.temperature_2m_min,
                                                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
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
                                                type: 'line',
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
                                    <View style={styles.blue}>
                                        <Image source={require("../assets/blue.png")} style={styles.icon} />
                                        <Text style={styles.bluetext}>Min temperature</Text>
                                        <Image source={require("../assets/rouge.png")} style={styles.icon} />
                                        <Text style={styles.bluetext}>Max temperature</Text>
                                    </View>
                                </View>
                                <View style={styles.fot}>
                                    <View style={styles.textl}>
                                        <FlatList
                                            data={time}
                                            horizontal={true}
                                            renderItem={({item, index}) => {
                                                return(
                                                    <>
                                                        <View style={styles.weathercontainer}>
                                                            <Text style={styles.weathertext}>{item}</Text>                                                
                                                            <Image source={mapimagePath[getWeatherDescription(weather?.daily?.weather_code[index])]} style={styles.icon} />
                                                            <Text style={styles.maxtext}>{weather?.daily?.temperature_2m_max[index]} {weather?.daily_units?.temperature_2m_max} max</Text>
                                                            <Text style={styles.mintext}>{weather?.daily?.temperature_2m_min[index]} {weather?.daily_units?.temperature_2m_min} min</Text>
                                                        </View>
                                                    </>
                                                )
                                            }}
                                            keyExtractor={(item) => item}
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
                )}
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
        flex : 2,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        marginBottom : 15,
    },
    charttext : 
    {
        marginTop : 5,
        marginBottom : 5,
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
    },
    fot : 
    {
        flex : 2,
        marginBottom: 30,
        justifyContent: 'center',
        
    },
    textl : 
    {
        marginHorizontal: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        marginLeft: 10,
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
    blue : 
    {
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bluetext : 
    {
        marginLeft: 5,
        marginRight: 10,
        color: "#fff",
        fontSize: 15,
        textAlign: 'center',
    },
    icon : 
    {
        width: 30,
        height: 30,
    },
    maxtext: 
    {
        marginTop : 10,
        marginBottom: 10,
        color: "#FF6347",
        fontSize: 16,
    },
    mintext: 
    {
        marginTop : 10,
        marginBottom: 10,
        color: "#1E90FF",
        fontSize: 16,
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