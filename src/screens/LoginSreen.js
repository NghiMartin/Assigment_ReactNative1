// LoginScreen.js
import React from 'react';
import {  View } from 'react-native';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native'; // Import thêm hook này

const LoginScreen = () => {
  const navigation = useNavigation(); // Sử dụng hook useNavigation để có thể sử dụng navigation

  const handleLogin = (user) => {
    // Xử lý khi đăng nhập thành công, chuyển đến màn hình Home
    navigation.navigate('Tab', { user });
  };
  return (
    <View>
      <LoginForm  onLogin={handleLogin} />
    </View>
  );
};

export default LoginScreen;
