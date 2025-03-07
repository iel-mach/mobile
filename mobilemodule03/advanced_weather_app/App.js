import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MyProvider } from './Context';
import BottomBar from './bottombar';
import TopBar from './topbar';
import {StyleSheet, ImageBackground} from 'react-native';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
  
  return (
    <MyProvider>
      <NavigationContainer>
        <ImageBackground
          source={require('./assets/background.jpg')}
          style={styles.background}
        >
          <TopBar />
          <BottomBar/>
        </ImageBackground>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});