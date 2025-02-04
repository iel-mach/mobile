import react, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Keyboard, FlatList } from 'react-native';
import { useMyContext } from './Context';
import * as Location from 'expo-location';
import axios from 'axios';


export default function TopBar({location,errorMsg}) {
  const {data, setData, setErrorMsg, searchQuery, setSearchQuery,setLocation} = useMyContext();
  const[text, Settext] = useState("")

  useEffect(() => {
    let opt = {
      method : 'GET',
      url : 'https://geocoding-api.open-meteo.com/v1/search',
      params: {
        name: searchQuery,
        count: 10,
        language: 'en', 
      },
    }
    axios.request(opt).then((res) => 
    {
      if (res.data && res.data.results && res.data.results.length > 0)
      {
        // console.log("res ==>", res.data.results[0]);
        setData(res?.data?.results)
      }
      else
        console.log('No results found.');
    }).catch((error) => {
      console.log('Error fetching location data');
      console.error(error);
    })
  },[searchQuery])
  console.log("data ==>", data[0])
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
  return (
    <View style={styles.topbar}>
        <TouchableOpacity onPress={onclick}>
            <FontAwesome style={styles.iconsearch} name="search" color={'black'} size={20}/>
        </TouchableOpacity>
          <TextInput style={styles.inputsearch}  placeholder="Search location..." onChangeText={(text) => setSearchQuery(text)} ></TextInput>
          <FlatList data={data} 
          renderItem={({item, index}) => {
            return(
              <>
                <View>
                  <Text>{item?.name} {item?.country} {item?.admin1}</Text>
                </View>
              </>
            )
          }} 
          />
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