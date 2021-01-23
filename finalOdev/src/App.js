import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Home from './screens/Home';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Signup} options={{ title: 'Kayıt Ol' }} />
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

