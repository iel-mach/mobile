import { useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)


  const onButtonPress = (item) => {
    console.log("button pressed :", item)
  }
  const [input, setInput] = useState(0)
  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <Text style={styles.textbar}>Calculator</Text>
      </View>
      <View style={styles.resultcontainer}>
        <Text style={styles.result}>0</Text>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.input}>0</Text>
        {/* <TextInput style={styles.input} value={input} onChangeText={setInput} keyboardType='numeric' /> */}
        </View>
        <View style={styles.buttoncontainer}>
          {['7', '8', '9', 'C', 'AC', '4', '5', '6', '+', '-', '1', '2', '3', '*', '/', '0', '.', '00', '='].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.botton}
                onPress={() => onButtonPress(item)}
              >
                <Text style={styles.buttontext}>{item}</Text>
              </TouchableOpacity>
            )
          )
          }
        </View>
      {/* <View style={styles.numberscontainer}> */}

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#094044',
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  appbar: {
    flex: 1,
    marginTop: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#145054',
  },
  textbar: {
    color: '#fff',
    fontWeight: "800",
    fontSize: wp(4),
  },
  resultcontainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  result: {
    fontSize: wp(10),
    color: '#0e8a93',
  },
  inputcontainer: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  input: {
    fontSize: wp(10),
    color: '#0e8a93',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end'
  },
  buttoncontainer: {
    flex: 7,
    justifyContent : 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#10696f"
  },
  botton: {
    fontSize: wp(15),
    width: '20%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0d6268',
  },
  buttontext: {
    fontSize: wp(7),
  },
});
