import { apiUrl } from "../constants/api";
import axios from "axios";

const getAllProduct = async () => {
    // try {
    // const response = await axios.get(`${apiUrl}/getAllProduct.php`);
    // if (response.status === 200) {
    //     const data =  response.data;
    //     console.log(data)
    //   return data;
    //   } else {
    //     console.error('Xảy ra lỗi getList');
    //   }
    //   console.log(data.json());
    // } catch (error) {
    //     console.error('Đã xảy ra lỗi:', error);
    // }
    try {
      const response = await axios.get('http://192.168.1.24:3000/products');
      if (response.status === 200) {
          const data = JSON.parse(JSON.stringify(response.data));
          console.log(data);
          console.log('getList thành công!');
        return data;
  
        } else {
          console.error('Xảy ra lỗi getList');
        }
        console.log(data.json);
      } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
      }
}

export {getAllProduct};