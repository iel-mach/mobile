import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { useMyContext } from '../Context';
import {getWeatherDescription} from '../utils/utils'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function WeeklyScreen() {
    const {citycoords, showContent, errorMsg, weather} = useMyContext()
    return(
        <ImageBackground
                        source={require('../assets/background.jpg')}
                        style={styles.background}
                      >
        <View style={styles.container}>
            {showContent ? (
                errorMsg ? ( 
                    <View style={styles.showerror}>
                        <Text style={styles.error}>{errorMsg}</Text>
                    </View>
                ) : (
                    <View style={styles.showContent}>
                        <Text style={styles.text}>{citycoords.city}</Text>
                        <Text style={styles.text}>{citycoords.region}</Text>
                        <Text style={styles.text}>{citycoords.country}</Text>
                        <FlatList
                            data={weather?.daily?.time}
                            renderItem={({item, index}) => {
                                return(
                                    <>
                                        <View style={styles.weathercontainer}>
                                            <Text style={styles.weathertext}>{item}</Text>
                                            <Text style={styles.weathertext}>{weather?.daily?.temperature_2m_min[index]} {weather?.daily_units?.temperature_2m_min}</Text>
                                            <Text style={styles.weathertext}>{weather?.daily?.temperature_2m_max[index]} {weather?.daily_units?.temperature_2m_max}</Text>
                                            <Text style={styles.weathertext}>{getWeatherDescription(weather?.daily?.weather_code[index])}</Text>
                                        </View>
                                    </>
                                )
                            }}
                            keyExtractor={(item) => item}
                        />
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
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    showContent : {
        alignItems: 'center',
        paddingTop: 20,
    },
    text : {
        color: "gray",
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
    },
    weathercontainer : {
        flex: 1,
        flexDirection: "row",
        gap : wp(10),
        marginBottom: wp(2),
        marginTop : wp(3),
    },
    weathertext : {
        color: "gray",
        fontSize: 16,
    },
});