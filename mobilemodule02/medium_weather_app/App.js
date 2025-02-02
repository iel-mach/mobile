import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MyProvider, useMyContext } from './Context';
import BottomBar from './bottombar';
import TopBar from './topbar';
import {useEffect, useState} from 'react'
import * as Location from 'expo-location';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
  // const {setErrorMsg, setLocation, errorMsg, location} = useMyContext();
  // const [ll, setll] = useState(null);
  // const [llo, setllo] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('geolocation is not available please enable it in you settings');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    }

    getCurrentLocation();
  }, [])
  console.log("app ===>",errorMsg);
  console.log("apploc ===>",location);
  return (
    <MyProvider>
      <NavigationContainer>
        <TopBar location={location} errorMsg={errorMsg}/>
        <BottomBar/>
      </NavigationContainer>
    </MyProvider>
  );
}
