import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function App() {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

  const handleClick = () => {
    console.log("Button pressed")
  }
  return (
    <View style={styles.container}>
      <View style={styles.te}>
        <Text style={styles.text}>Hello World</Text>
      </View>
      <Pressable style={styles.button} onPress={handleClick}>
        <Text style={styles.textbutton}>Click me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  te: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    height: hp(6),
    marginVertical: 6,
    borderRadius: wp(2),
  },
  text: {
    color: '#fff',
    fontSize: hp(3),
    fontWeight: "800",
  },
  button: {
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
    width: wp(24),
    height: hp(5),
  },
  textbutton: {
    color: 'orange',
    fontSize: hp(2),
  },
});
