// LoginForm.js
import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Alert, Image, Text } from 'react-native';
import { login } from '../api/authservice/authApi';
import CustomButton from './CustomButton';

import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import InputField from './InputField';
import { Validator } from '../theme/validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginForm = ({ onLogin}) => {
  const [username, setUsername] = useState('');
  console.log(username);
  const [password, setPassword] = useState('');
  console.log(password);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isCheckRemember, setisCheckRemember] = useState(false);
  const getInfor = async () => {
    try {
      const account = await AsyncStorage.getItem('account');
      if (account !== null) {
        const parsedAccount = JSON.parse(account);
        setUsername(parsedAccount.username);
        setPassword(parsedAccount.password);
        setisCheckRemember(true);
      } else {
        console.log('Không có dữ liệu');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getInfor();
  }, []);

  const handleLogin = async () => {
    const validateUsername =  Validator.username(username,setUsernameError);
    const validatePassword=  Validator.password(password,setPasswordError);
    if(!validateUsername && !validatePassword){
      const user = await login(username, password);
      if(user) {
        try {
          if(isCheckRemember) {
            AsyncStorage.setItem("account", {
              id: user.id,
              username: user.username,
              password: user.password
            });
          }else AsyncStorage.removeItem("account");
        } catch (error) {
          console.log(error);
        }
        onLogin(user);
      }
    }   
   }

  return (
    <KeyboardAvoidingView>
            <View style = {{alignItems: 'center', backgroundColor: COLORS.primaryBlackHex, height: '100%', padding: 20}}>
      <Image style={{width: 200, height: 200}} source={require('../assets/app_images/logo.png')} />
      <Text style={{color: 'white',fontSize: FONTSIZE.size_18 , fontFamily: FONTFAMILY.poppins_bold}}>Welcome to Lungo !!</Text>
      <Text style={{color: 'white',fontSize: FONTSIZE.size_14 , fontFamily: FONTFAMILY.poppins_}}>Login to continue</Text>

      <InputField value ={username} error={usernameError} label="Username" onChangeText={setUsername} />
      <InputField value = {password} error={passwordError}  inputType={'password'} label="Password" onChangeText={setPassword} />
      <TouchableOpacity onPress={() => setisCheckRemember(!isCheckRemember)} style={{flexDirection: "row" ,   alignItems: "start", justifyContent: 'start'}}>
            { isCheckRemember ? (
              <Icon
                name="checkbox-outline"
                size={20}
                color={COLORS.primaryOrangeHex}
              />
            ) : (
              <Icon name="square-outline" size={20} color="#666" />
            )}
            <Text style={{marginLeft: 10, color: 'white' ,   fontFamily: FONTFAMILY.poppins_medium , fontSize: FONTSIZE.size_14}}>Remember Me</Text>
          </TouchableOpacity>
      <CustomButton label="Login" onPress={handleLogin} />
      <CustomButton label="SignUp" onPress={() => {navigation.navigate('Register')}} />
    </View>
    </KeyboardAvoidingView>

  );
  }
export default LoginForm;
