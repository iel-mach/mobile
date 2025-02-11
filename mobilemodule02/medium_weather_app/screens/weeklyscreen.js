import { StyleSheet, Text, View } from 'react-native';
import { useMyContext } from '../Context';

export default function WeeklyScreen() {
    const {citycoords, showContent, errorMsg} = useMyContext()
    return(
        <View style={styles.container}>
            {showContent ? (
             errorMsg ? ( 
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
                <View>
                <Text style={styles.textcontainer}>{citycoords.name}</Text>
                <Text style={styles.textcontainer}>{citycoords.admin1}</Text>
                <Text style={styles.textcontainer}>{citycoords.country}</Text>
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
        paddingTop: 30,
      //   justifyContent: 'center',
      },
      textcontainer: {
          fontSize: 20,
          // fontWeight: "800",
          textAlign: 'center',
      },
      error : {
          fontSize: 20,
          fontWeight: "800",
          color: "red",
          textAlign: 'center',
      }
});