import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Keyboard, FlatList } from 'react-native';
import { useMyContext } from './Context';
import {getcities} from './api/api.js';


export default function TopBar() {
  const {getMyCoords , mylocation, getMyLocation, setCitycoords, setShowContent, data, setErrorMsg, searchQuery, setSearchQuery} = useMyContext();

  getcities(searchQuery);

  const Geolocation = () => {
    setCitycoords("")
    setSearchQuery("")
    setErrorMsg("");
    if(!mylocation)
      getMyLocation()
    getMyCoords();
  }
  
  const setcityitem = (item) => {
    setSearchQuery("")
    setCitycoords({
      lt: item.latitude,
      lg: item.longitude,
      city: item.name,
      country : item.country,
      region : item.admin1,
      timezone : item.timezone,
    })
  }

  const onclick = () => {
    Keyboard.dismiss()
    setShowContent(true);
    if(!data)
    {
      setSearchQuery("");
      setErrorMsg("could not find any result for the supplied address or coordinates");
    }
  }
  const onchange = (text) => {
    setSearchQuery(text);
    setShowContent(false);
  }

  return (
    <View style={styles.topbar}>
      <View style={styles.top}>
        <TouchableOpacity onPress={onclick}>
            <FontAwesome style={styles.iconsearch} name="search" color={'gray'} size={20}/>
        </TouchableOpacity>
          <TextInput style={styles.inputsearch} value={searchQuery} placeholderTextColor={'gray'} placeholder="Search location..." onChangeText={(text) => onchange(text)} onSubmitEditing={() => onclick()} ></TextInput>
        <TouchableOpacity onPress={() => Geolocation()}>
            <FontAwesome style={styles.iconlocation} name="location-arrow" color={'gray'} size={20}/>
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
                null
              )}
            </View>
          )}
          data={data}
          renderItem={({item, index}) => {
            return(
              <>
                <View style={styles.itemcontainer}>
                  <TouchableOpacity onPress={() => setcityitem(item)} style={styles.touchable}>
                    <Text style={styles.citysearch}>{item?.name}</Text>
                    <Text style={styles.textsearch}>{item?.admin1}</Text>
                    <Text style={styles.textsearch}>{item?.country}</Text>
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
      backgroundColor: "transparent",
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
      color: "gray",
      width: wp(50),
      fontSize: 15,
    },
    iconlocation: {
      marginRight: wp(3),
    },
    itemcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      backgroundColor: 'transparent',
    },
    touchable: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    citysearch: {
      marginRight: 10,
      color: 'gray',
      fontWeight: 'bold',
      fontSize: 16,
    },
    textsearch : {
      marginRight: 10,
      fontSize: 16,
      color: 'gray',
    },
    emptyListText : {
      fontSize: 16,
      color: 'gray',
      fontWeight: 'bold',
    },
    emptyListcontainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });