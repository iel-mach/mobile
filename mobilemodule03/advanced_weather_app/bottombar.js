import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentlyScreen from './screens/currentlyscreen';
import TodayScreen from './screens/todayscreen';
import WeeklyScreen from './screens/weeklyscreen';


const Tab = createMaterialTopTabNavigator();

export default function BottomBar() {
    return (
        <Tab.Navigator
        initialRouteName="Currently"
        tabBarPosition="bottom"
        screenOptions={{
            tabBarActiveTintColor: '#FF8C00',
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