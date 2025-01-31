import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MyProvider } from './Context';
import BottomBar from './bottombar';
import TopBar from './topbar';
import {useEffect, useState} from 'react'
import * as Location from 'expo-location';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
  // const [ll, setll] = useState(null);
  // const [llo, setllo] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    }

    getCurrentLocation();
  }, [])
  return (
    <MyProvider>
      <NavigationContainer>
        <TopBar loc={location} />
        <BottomBar/>
      </NavigationContainer>
    </MyProvider>
  );
}
