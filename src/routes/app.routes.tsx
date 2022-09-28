import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Game } from '../screens/Game';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="profile"
        component={Profile}
      />
      <Screen
        name="game"
        component={Game}
      />
    </Navigator>
  )
}