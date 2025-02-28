import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { useMyContext } from '../Context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function TodayScreen() {
    const {weatherhourly, citycoords, showContent, errorMsg}  = useMyContext()
    return(
        <View style={styles.container}>
            {showContent ? (
             errorMsg ? ( 
                <View style={styles.showerror}>
                    <Text style={styles.error}>{errorMsg}</Text>
                </View>
            ) : (
                <View style={styles.showContent}>
                <Text style={styles.text}>{citycoords?.city}</Text>
                <Text style={styles.text}>{citycoords?.region}</Text>
                <Text style={styles.text}>{citycoords?.country}</Text>
                <FlatList
                    data={weatherhourly?.hourly?.time}
                    renderItem={({item, index}) => {
                        return(
                            <>
                            {/* {console.log(item)} */}
                            <View style={styles.weathercontainer}>
                                <Text style={styles.weathertext}>{item?.split("T")[1]}</Text>
                                <Text style={styles.weathertext}>{weatherhourly?.hourly?.temperature_2m[index]} {weatherhourly?.hourly_units?.temperature_2m}</Text>
                                <Text style={styles.weathertext}>{weatherhourly?.hourly?.wind_speed_10m[index]} {weatherhourly?.hourly_units?.wind_speed_10m}</Text>
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
      alignItems: 'center',
    },
    showContent : {
        paddingTop: 15,
    },
    text : {
        color: "gray",
        fontSize: 20,
        textAlign: 'center',
    },
    showerror : {
        width : '100%',
        justifyContent: 'center',
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
        gap : wp(25),
        justifyContent: "space-around",
        marginBottom: wp(2),
        marginTop : wp(3),
    },
    weathertext : {
        fontSize: 16,
        color: "gray",
        // flexGrow: 1,
    },
});