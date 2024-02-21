import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    return token;
  } catch (error) {
    console.error('Error retrieving token', error);
    throw error;
  }
};
export {getToken};