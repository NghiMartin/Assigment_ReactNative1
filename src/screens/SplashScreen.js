// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import { getToken } from '../api/authservice/getToken';
import EmptyListAnimation from '../components/EmptyListAnimation';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {

    const token = getToken();
    console.log(token);
    if(token) {   
      const timeoutId = setTimeout(() => {
        navigation.navigate('Login');
    }, 3000); 
    }else{
      const timeoutId = setTimeout(() => {
      navigation.navigate('Tab');

      }, 3000); 
    }

    // Cleanup: Clear timeout khi component unmount
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <EmptyListAnimation title='Emty Splash'/> */}
      <Image style={styles.image} source={require('../assets/app_images/logo.png')}/>
      <Text style={styles.text}>Welcome to My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex
  },
  text: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: COLORS.primaryOrangeHex
  },
  image: {
    width: 300,
    height: 300
  }
});

export default SplashScreen;
