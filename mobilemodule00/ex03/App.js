import { useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)


  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const onButtonPress = (value) => {
    if (value === '=')
    {
      try {
        setResult(eval(input))
      }catch{
        setResult('error')
      }
    }
    else if (value === 'AC')
    {
      setResult('')
      setInput('')
    }
    else if (value === 'C')
      setInput(input.slice(0, -1))
    else
    {
      setInput(input + value)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <Text style={styles.textbar}>Calculator</Text>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} keyboardType='numeric' />
      </View>
      <View style={styles.resultcontainer}>
        <Text style={styles.resultText}>{result}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#094044',
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
    fontSize: wp(5),
  },
  resultcontainer: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: wp(10),
    color: '#0e8a93',
  },
  inputcontainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  input: {
    fontSize: wp(10),
    color: '#0e8a93',
  },
  buttoncontainer: {
    flex: 7,
    justifyContent : 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#10696f"
  },
  botton: {
    fontSize: wp(10),
    width: '20%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0d6268',
  },
  buttontext: {
    fontSize: wp(5),
  },
});
