import * as ScreenOrientation from 'expo-screen-orientation';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function App() {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

  const [word, setWord] = useState("A simple text")
  const handleClick = (word) => {
    if (word == "A simple text")
      setWord("Hello World")
    else
      setWord("A simple text")
  }
  return (
    <View style={styles.container}>
      <View style={styles.te}>
        <Text style={styles.text}>{word}</Text>
      </View>
      <Pressable style={styles.button} onPress={() => handleClick(word)}>
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
