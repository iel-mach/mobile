import react, { useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Keyboard, FlatList } from 'react-native';
import { useMyContext } from './Context';
import * as Location from 'expo-location';
import {getcities} from './api/api.js';
import axios from 'axios';


export default function TopBar() {
  const {mylocation, getMyLocation, setCitycoords, setShowContent, data, setData, setErrorMsg, searchQuery, setSearchQuery,setLocation} = useMyContext();

  getcities(searchQuery);

  const Geolocation = () => {
    getMyLocation()
    // console.log(mylocation)
    setCitycoords(mylocation)
  }
  
  const setcityitem = (item) => {
    setShowContent(true)
    setSearchQuery("")
    setCitycoords({
      lt: item.latitude,
      lg: item.longitude,
      city: item.name,
      country : item.country,
      region : item.admin1,
    })
  }

  const onclick = () => {
        Keyboard.dismiss()
  }
  const onchange = (text) => {
    setSearchQuery(text);
    setShowContent(false);
  }

  return (
    <View style={styles.topbar}>
      <View style={styles.top}>
        <TouchableOpacity onPress={onclick}>
            <FontAwesome style={styles.iconsearch} name="search" color={'black'} size={20}/>
        </TouchableOpacity>
          <TextInput style={styles.inputsearch} value={searchQuery} placeholder="Search location..." onChangeText={(text) => onchange(text)} onSubmitEditing={() => onclick()} ></TextInput>
        <TouchableOpacity onPress={() => Geolocation()}>
            <FontAwesome style={styles.iconlocation} name="location-arrow" color={'black'} size={20}/>
        </TouchableOpacity>
        </View >
          <FlatList
          ListEmptyComponent={() => (
            <View>
              {searchQuery ? (
                <View style={styles.emptyListcontainer}>
                <Text style={styles.emptyListText}>No City found.</Text>
                </View>
              ) : ( 
                <></>
              )}
            </View>
          )}
          data={data}
          renderItem={({item, index}) => {
            return(
              <>
                <View style={styles.itemcontainer}>
                  <TouchableOpacity onPress={() => setcityitem(item)}>
                    <Text style={styles.textsearch}>{item?.name} {item?.admin1} {item?.country}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
          }} 
          />
    </View>
)
}


const styles = StyleSheet.create({
    topbar: {
      // flex: 3,
      backgroundColor: "#808080",
      paddingTop: hp(3),
    },
    top : {
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
    itemcontainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      backgroundColor: '#fff',
    },
    textsearch : {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
      // width: wp(50),
    },
    emptyListText : {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
    emptyListcontainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });