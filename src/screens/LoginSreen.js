// LoginScreen.js
import React from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginScreen = ({ navigation }) => {

  const handleLogin = (user) => {
    // Xử lý khi đăng nhập thành công, chuyển đến màn hình Home
    navigation.navigate('Home', { user });
  };

  return (
    <View>
      <LoginForm  onLogin={handleLogin} />
    </View>
  );
};

export default LoginScreen;
