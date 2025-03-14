import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentlyScreen from './screen/currentlyscreen';
import TodayScreen from './screen/todayscreen';
import WeeklyScreen from './screen/weeklyscreen';


const Tab = createMaterialTopTabNavigator();

export default function BottomBar() {
    return (
        <Tab.Navigator
        initialRouteName="Currently"
        tabBarPosition="bottom"
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