/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Account,
  CreateProfile,
  Dashboard,
  Home,
  Login,
  Theme,
} from './pages/index';
const Stack = createNativeStackNavigator();

const themes = {
  ocean: {
    colors: {
      backgroundButton: '#fff3e3',
      background: '#67a9ef', //backgraound of each screen
      text: 'black',
      backgroundInput: '#FFFFFF',
      colorInputText: 'black',
      textImage: 'black',
      iconColor: '#fff3e3',
    },
  },
  yellowish: {
    colors: {
      backgroundButton: '#F0D773',
      background: '#F7F2BD', //backgraound of each screen
      text: '#FFFFFF',
      backgroundInput: '#FFFFFF',
      colorInputText: 'black',
      textImage: '#67A9EF',
      iconColor: '#67A9EF',
    },
  },
  light: {
    colors: {
      backgroundButton: '#67a9ef',
      background: '#fff3e3', //backgraound of each screen
      text: '#FFFFFF',
      backgroundInput: '#FFFFFF',
      colorInputText: 'black',
      textImage: '#67A9EF',
      iconColor: '#67A9EF',
    },
  },
};

const App = () => {
  const [theme, setTheme] = useState(themes['light']);

  const handlerThemes = value => {
    setTheme(themes[value]);
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={CreateProfile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Theme">
          {props => <Theme {...props} handlerThemes={handlerThemes} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
