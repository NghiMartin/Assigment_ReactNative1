// RegisterForm.js
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { register } from '../api/authservice/authApi';
import CustomButton from './CustomButton';
const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await register(username, password);
      onRegister(user);
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <View style= {{justifyContent: 'center'}}>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <CustomButton label="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterForm;
