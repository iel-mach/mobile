import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MyProvider } from './Context';
import BottomBar from './bottombar';
import TopBar from './topbar';
import {StyleSheet, ImageBackground } from 'react-native';
import {useEffect, useState} from 'react'


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
  
  return (
    <MyProvider>
      <NavigationContainer>
      <ImageBackground
                source={require('./background.jpg')}
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
    // paddingTop: 10, // Make sure the background image covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
});