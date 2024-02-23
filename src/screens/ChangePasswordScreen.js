import { Image, Text, View } from "react-native"
import InputField from "../components/InputField"
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../theme/theme";
import { Validator } from "../theme/validator";
import { changePassword } from "../api/authservice/authApi";
import { useSelector } from "react-redux";

export default ChangePasswordScreen = () => {
  const users = useSelector((state) => state.Products.Users);
  const [passwordOld, setPasswordOld] = useState('');
  const [newpass, setNewpass] = useState('');
  const [reNewPass, setreNewPass] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [reNewPasswordError, setreNewPasswordError] = useState('');

    const handlerChangePass =async () => {
        const validatePassword = Validator.password(passwordOld,setPasswordError);
        const validatePasswordNew = Validator.password(newpass,setnewPasswordError);
        const validatePasswordReNew = Validator.password(reNewPass,setreNewPasswordError);
      if(!validatePassword && !validatePasswordNew && !validatePasswordReNew) {
        if(newpass !== reNewPass){
          setreNewPasswordError('Mật khẩu chưa khớp!');
          return;
        }else setreNewPasswordError('');
        const changepass = await changePassword({oldpassword: passwordOld,newpassword: reNewPass});
      }
       
        
    }
    return(
        <View style={{ alignItems: 'center', backgroundColor: COLORS.primaryBlackHex, height: '100%', padding: 20 }}>
        <Image style={{ width: 150, height: 150 }} source={require('../assets/app_images/logo.png')} />

        <InputField inputType={'password'} label="Password Old" onChangeText={setPasswordOld} error={passwordError} />
        <InputField inputType={'password'} label="New Password" onChangeText={setNewpass} error={newPasswordError} />
        <InputField inputType={'password'} label="Re new password" onChangeText={setreNewPass} error={reNewPasswordError} />

        <CustomButton label="ChangePass" onPress={handlerChangePass} />
      </View>
    )
}
