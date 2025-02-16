import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useMyContext } from '../Context';
import {getWeatherDescription} from '../utils/utils'

export default function WeeklyScreen() {
    const {citycoords, showContent, errorMsg, weather} = useMyContext()
    return(
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    showContent : {
        alignItems: 'center',
        paddingTop: 20,
    },
    text : {
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
        gap : 30,
        marginBottom: 20,
        marginTop : 10,
    },
    weathertext : {
        fontSize: 16,
    },
});