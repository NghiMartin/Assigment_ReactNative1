import axios from 'axios';
import { AsyncStorage } from 'react-native';

const login = async (username, password) => {
  try {
    const response = await axios.get('http://localhost:3000/account', {
      params: {
        username,
        password,
      },
    });

    const user = response.data[0];

    if (user) {
      // Đăng nhập thành công, tạo và trả về token
      const token = generateToken(); // Thay thế bằng hàm tạo token của bạn
      await AsyncStorage.setItem('token', token);
      return token;
    } else {
      // Đăng nhập thất bại, trả về null hoặc thông báo lỗi
      return null;
    }
  } catch (error) {
    console.error('Sign In Failed', error);
    throw error;
  }
  };
  

  const register = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/account', {
        username,
        password,
      });
  
      return response.data;
    } catch (error) {
      console.error('Sign Up Failed', error);
      throw error;
    }
  };
  const jwt = require('jsonwebtoken');

  const generateToken = () => {
    const secretKey = 'your-secret-key'; // Thay thế bằng secret key của bạn
    const token = jwt.sign({ data: 'your-data' }, secretKey, { expiresIn: '1h' });
    return token;
  };
  
  export { generateToken };
  // userApi.js
const getUserProfile = async (userId) => {
    // Gửi yêu cầu lấy thông tin người dùng từ JSON Server
    // Trả về thông tin người dùng hoặc mã lỗi
  };
  export { login,register,getUserProfile };
  
  