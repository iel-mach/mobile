import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MyProvider } from './Context';
import BottomBar from './bottombar';
import TopBar from './topbar';


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

  return (
    <MyProvider>
      <NavigationContainer>
        <TopBar/>
        <BottomBar/>
      </NavigationContainer>
    </MyProvider>
  );
}
