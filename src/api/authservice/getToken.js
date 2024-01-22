import { AsyncStorage } from 'react-native';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token', error);
    throw error;
  }
};
export {getToken};