import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import FirebaseDynamicLink from '../screens/FirebaseDynamicLink';

const Stack = createNativeStackNavigator();

export default ({...props}) => {
  console.log({props});
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // statusBarStyle: 'auto',
          statusBarStyle: 'dark',
          // statusBarHidden: true,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="FirebaseDynamicLink"
          component={FirebaseDynamicLink}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
