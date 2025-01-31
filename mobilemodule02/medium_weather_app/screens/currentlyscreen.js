import { StyleSheet, Text, View } from 'react-native';
import { useMyContext } from '../Context';

export default function CurrentlyScreen() {
    const {golocation, searchQuery, location} = useMyContext()
    let latitude = location.loc.coords.latitude;
    let longitude = location.loc.coords.longitude;
    return(
        <View style={styles.container}>
            <Text style={styles.textcontainer}>Currently</Text>
            <Text style={styles.textcontainer}>{latitude}</Text>
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
    }
  });