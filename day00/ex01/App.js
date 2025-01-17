import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function App() {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
