import react, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, TextInput, TouchableOpacity,Keyboard } from 'react-native';
import { useMyContext } from './Context';
import * as Location from 'expo-location';
import axios from 'axios';


export default function TopBar({location,errorMsg}) {
    const {setErrorMsg, searchQuery, setSearchQuery,setLocation} = useMyContext();

    const onclick = () => {

    }
    const Geolocation = () => {
      async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted')
        {
          setLocation(null)
          if (errorMsg)
            setErrorMsg(errorMsg)
          else
            setErrorMsg('geolocation is not available please enable it in you settings');        
        }
        else
        {
          setErrorMsg(null)
          if (location)
            setLocation(location)
          else
          {
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc)
          }
        }
      }
      getCurrentLocation()
    }
    const {text, setText} = useState()
    console.log(text);
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
          params: {
            q: text,  // Query for the location (city, etc.)
            limit: 1,      // Limit the results to 1
            language: 'en', // Set language preference (optional)
          },
        });
        if (response.data && response.data.results && response.data.results.length > 0) {
          console.log(response.data.results[0]); // Save the first result
        } else {
          seconsole.logtError('No results found.');
        }
      } catch (error) {
        console.log('Error fetching location data');
        console.error(error);
      }
    };
    return (
    <View style={styles.topbar}>
        <TouchableOpacity onPress={onclick}>
            <FontAwesome style={styles.iconsearch} name="search" onChangeText={newText => setText(newText)} color={'black'} size={20}/>
        </TouchableOpacity>
          <TextInput style={styles.inputsearch} placeholder="Search location..."></TextInput>
        <TouchableOpacity onPress={() => Geolocation()}>
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