// LoginScreen.js
import React, { useState } from 'react';
import {  View } from 'react-native';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native'; // Import thêm hook này
import {  useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../api/product/productApi';
import { setBeanList, setCoffeeList } from '../store/slice_control';
const LoginScreen = () => {
  // const dispatch = useDispatch();

  // const setDataCoffeeList = (arrCoffee) => dispatch(setCoffeeList(arrCoffee));
  // const setDataBeanList = (arrBean) => dispatch(setBeanList(arrBean));
  // // const setUsers = (users) => dispatch(setUsers(users));
  // // const users = useSelector((state) => state.Products.Users);
  // // console.log(users);
  // const [dataAll,setData] = useState([]);

  // const addDataCoffeeList = async() => {
  //   if(dataAll){
  //     const dataCoffeeFilter = await dataAll?.filter((coffee) => coffee.id?.startsWith('C'));
  //     setDataCoffeeList(dataCoffeeFilter);
  //   }
 
  // }
  // const filterData = (stringId) => {
  //   dataAll?.filter((coffee) => coffee.id?.startsWith(stringId));
  // }
  // const addDataBeanList = async() => {
  //   if(dataAll){
  //     const dataBeanFilter =  await dataAll?.filter((coffee) => coffee.id?.startsWith('B'));
  //     setDataBeanList(dataBeanFilter);
  //   }
  // }
  // const fechDataProduct = async () => {
  //   const data = await getAllProduct();
  //   if(data){
  //     setData(data);
  //   }
  //  };
  
  const navigation = useNavigation(); // Sử dụng hook useNavigation để có thể sử dụng navigation

  const handleLogin = async (user) => {
    // Xử lý khi đăng nhập thành công, chuyển đến màn hình Home
   
    navigation.navigate('Tab', {user});
  };
  return (
    <View>
      <LoginForm navigation={navigation} onLogin={handleLogin} />
    </View>
  );
};

export default LoginScreen;
