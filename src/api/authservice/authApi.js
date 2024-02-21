import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../constants/api';
import { ToastAndroid } from 'react-native';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/checkLogin.php`, {
        username: username,
        password : password,
    });
    if (response.status === 200) {
      console.log('Đăng nhập thành công!');
      ToastAndroid.showWithGravity(
        `Đăng nhập thành công!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      console.error('Xảy ra lỗi khi thêm người dùng.');
    }
    const user = response.data;
    console.log(user);
    return user;
  } catch (error) {
    checkLogin = false;
    ToastAndroid.showWithGravity(
      `Sai tài khoản hoặc mật khẩu, mời bạn nhập lại!`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  };
  
  const register = async (objUser) => {
    let checkSignUp = false;
    try {
      // Gửi yêu cầu POST đến một URL hoặc API cụ thể với dữ liệu của người dùng mới
      const response = await axios.post(`${apiUrl}/createAccount.php`,objUser, {
        headers: {
          accept: 'application/json'
        }
      });
      // Kiểm tra phản hồi từ máy chủ
      if (response.status === 200) {
        console.log('Người dùng đã được thêm thành công!');
        ToastAndroid.showWithGravity(
          `Người dùng ${objUser.username} đã được thêm thành công!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        checkSignUp = true;
      } else {
        console.error('Xảy ra lỗi khi thêm người dùng.');  
      }
    } catch (error) {
      checkSignUp =false;
     ToastAndroid.showWithGravity(
        `Email hoặc username đã có người đăng ký, mời bạn nhập lại!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    return checkSignUp;
  };

  // const jwt = require('jsonwebtoken');

  // const generateToken = () => {
  //   const secretKey = 'your-secret-key'; // Thay thế bằng secret key của bạn
  //   const token = jwt.sign({ data: 'your-data' }, secretKey, { expiresIn: '1h' });
  //   return token;
  // };
  
  // export { generateToken };
  // userApi.js
const getUserProfile = async (userId) => {
    // Gửi yêu cầu lấy thông tin người dùng từ JSON Server
    // Trả về thông tin người dùng hoặc mã lỗi

  };
  export { login,register,getUserProfile };
  
  