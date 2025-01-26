import { StyleSheet, Text, View } from 'react-native';
import { useMyContext } from '../Context';

export default function WeeklyScreen() {
    const {golocation, searchQuery} = useMyContext()
    return (
        <View style={styles.container}>
            <Text style={styles.textcontainer}>Weekly</Text>
            <Text style={styles.textcontainer}>{golocation ? golocation : searchQuery}</Text>
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