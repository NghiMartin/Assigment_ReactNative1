// StackNavigator.js
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginSreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import CartScreen from '../screens/CartScreen';
import ChangeInfoScreen from '../screens/ChangeInfoScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
enableScreens();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false , gestureEnabled: false}}>
      <Stack.Screen name="Splash" component={SplashScreen}  />
      <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom', gestureEnabled: false}}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="changeInFor" component={CartScreen} />
        <Stack.Screen name="favorites" component={FavoritesScreen} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
