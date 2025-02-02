import { StyleSheet, Text, View } from 'react-native';
import { useMyContext } from '../Context';

export default function CurrentlyScreen() {
    const {searchQuery,  location,errorMsg} = useMyContext()
    return(
        <View style={styles.container}>
            {errorMsg ? ( 
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
                <Text style={styles.textcontainer}>Currently</Text>
            )}
            {location ? (
                <Text style={styles.coords}>{location.coords.latitude} {location.coords.longitude}</Text>
                ) : (
                <Text style={styles.coords}></Text>
            )}
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
    textcontainer: {
        fontSize: 50,
        fontWeight: "800",
    },
    coords: {
        fontSize: 25,
        fontWeight: "800"
    },
    error : {
        fontSize: 20,
        fontWeight: "800",
        color: "red",
        textAlign: 'center',
    }
  });