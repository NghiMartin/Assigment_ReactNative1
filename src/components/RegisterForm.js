import React, { useState } from 'react';
import { View, TextInput, Image, Text, Alert } from 'react-native';
import { register } from '../api/authservice/authApi';
import CustomButton from './CustomButton';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import InputField from './InputField';
import { Validator } from '../theme/validator';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleRegister = async () => {
      // Kiểm tra điều kiện validate
    const validateUsername =  Validator.username(username,setUsernameError);
    const validateEmail =  Validator.email(email,setEmailError);
    const validatePassword=  Validator.password(password,setPasswordError);
    const validatePhone =  Validator.phone(phone,setPhoneError);

      if(!validateUsername && !validateEmail && !validatePassword && !validatePhone ) {
        console.log('=====>Đã xong validate');
      const user = await register({
          username: username,
          password: password,
          email: email,
          phone: phone
        });
      if(user) onRegister();      
      }
  };

  const isValidEmail = (email) => {
    // Thực hiện kiểm tra định dạng email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    // Thực hiện kiểm tra định dạng số điện thoại
    return /^(01[2689]|0[93578])[0-9]{8}$/.test(phone);
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: COLORS.primaryBlackHex, height: '100%', padding: 20 }}>
      <Image style={{ width: 150, height: 150 }} source={require('../assets/app_images/logo.png')} />
      <Text style={{ color: 'white', fontSize: FONTSIZE.size_18, fontFamily: FONTFAMILY.poppins_bold }}>Welcome to Lungo !!</Text>
      <Text style={{ color: 'white', fontSize: FONTSIZE.size_14, fontFamily: FONTFAMILY.poppins_ }}>Sign Up to continue</Text>

      <InputField label="Username" onChangeText={setUsername} error={usernameError} />
      <InputField label="Email" onChangeText={setEmail} error={emailError} />
      <InputField label="Phone" onChangeText={setPhone} error={phoneError} />
      <InputField inputType={'password'} label="Password" onChangeText={setPassword} error={passwordError} />
      <CustomButton label="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterForm;
