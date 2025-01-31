import react, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, TextInput, TouchableOpacity,Keyboard } from 'react-native';
import { useMyContext } from './Context';
import * as Location from 'expo-location';


export default function TopBar(loc) {
    const {setGeolocation, golocation, searchQuery, setSearchQuery,setLocation, location} = useMyContext();
    const[text, Settext] = useState("")

    setLocation(loc)
    const onclick = () => {
        if(golocation)
            setGeolocation('')
        setSearchQuery(text)
        Settext("")
        Keyboard.dismiss()
    }

return (
    <View style={styles.topbar}>
        <TouchableOpacity onPress={onclick}>
            <FontAwesome style={styles.iconsearch} name="search" color={'black'} size={20}/>
        </TouchableOpacity>
          <TextInput style={styles.inputsearch} value={text} placeholder="Search location..." onChangeText={(text) => Settext(text)} onSubmitEditing={() => onclick()}></TextInput>
        <TouchableOpacity onPress={() => setGeolocation("Geolocation")}>
            <FontAwesome style={styles.iconlocation} name="location-arrow" color={'black'} size={20}/>
        </TouchableOpacity>
    </View>
)
}


const styles = StyleSheet.create({
    topbar: {
      backgroundColor: "#808080",
      paddingTop: hp(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconsearch: {
      marginLeft: wp(5),
      marginRight: wp(3),
    },
    inputsearch : {
      width: wp(50),
      fontSize: 15,
    },
    iconlocation: {
      marginRight: wp(3),
    },
  });