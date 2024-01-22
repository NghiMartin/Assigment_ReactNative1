// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Sử dụng setTimeout để chuyển đến màn hình Login sau 3000ms (3 giây)
    const timeoutId = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    // Cleanup: Clear timeout khi component unmount
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
