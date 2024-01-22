// LoginForm.js
import React, { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import { login } from '../api/authservice/authApi';
import CustomButton from './CustomButton';

import { useNavigation } from '@react-navigation/native';

const LoginForm = ({ onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      const user = await login(username, password);
      onLogin(user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <KeyboardAvoidingView>
            <View style = {{alignItems: 'center'}}>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" onChangeText={setPassword}  />
      <CustomButton label="Login" onPress={onLogin} />
      <CustomButton label="SignUp" onPress={() => {navigation.navigate('Register')}} />
    </View>
    </KeyboardAvoidingView>

  );
};

export default LoginForm;
