import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentlyScreen from './screens/currentlyscreen';
import TodayScreen from './screens/todayscreen';
import WeeklyScreen from './screens/weeklyscreen';
import {StyleSheet, ImageBackground, View } from 'react-native';


const Tab = createMaterialTopTabNavigator();

export default function BottomBar() {
    return (
        // <ImageBackground
        //                 source={require('./background.jpg')}
        //                 style={styles.background}
        //       >
        // <View style={styles.bottombar}>
        <Tab.Navigator
        initialRouteName="Currently"
        tabBarPosition="bottom"
        screenOptions={{
            tabBarActiveTintColor: '#FF8C00',  // Color of the active tab text
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                height: 70,
            }
        }}
        >
            <Tab.Screen name='Currently' component={CurrentlyScreen} options={{
            tabBarIcon : ({color, size}) => (
                <FontAwesome name="sun" color={color} size={size}/>
            )
            }}/>
            <Tab.Screen name='Today' component={TodayScreen} options={{
            tabBarIcon : ({color, size}) => (
                <FontAwesome name="calendar-day" color={color} size={size}/>
            )
            }}/>
            <Tab.Screen name='Weekly' component={WeeklyScreen} options={{
            tabBarIcon : ({color, size}) => (
                <FontAwesome name="calendar-week" color={color} size={size}/>
            )
            }} />
        </Tab.Navigator>
    )
}

// const styles = StyleSheet.create({
//     bottombar: {
//     flex: 1,
//     backgroundColor: "transparent",
//     // paddingTop: 10, // Make sure the background image covers the entire screen
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
// });