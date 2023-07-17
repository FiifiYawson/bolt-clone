import {useState} from "react"
import { View, Text, StyleSheet } from 'react-native'
import PhoneInput from "react-native-phone-number-input"
import screenStyle from "../../styles/screenStyle"
import { PRIMARY_COLOR } from '../../config/constants'
import textStyles from "../../styles/textStyles"
import GreenButton from "../../components/GreenButton"


const Login = ({ navigation }) => {
  
  const [phoneNumber, setPhoneNumber] = useState("0")

  return (
    <View style={{ ...screenStyle.page, ...styles.page }}>
      <View>
        <Text style={textStyles.headText}>Enter your number</Text>
        <Text>We will send a code to verify your mobile number</Text>
        <View style={styles.numberInputField}>
          <PhoneInput 
            defaultCode='GH'
            onChangeText={(text)=>setPhoneNumber(text)}
            flagButtonStyle={{
              backgroundColor: "#FFFFFF"
            }}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.loginText}>Log in with facebook</Text>
        <GreenButton title="CONTINUE" navigation={navigation} nextRoute="codeInput" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "space-between"
  },
  numberInputField: {
    borderWidth: 3,
    borderRadius: 8,
    marginVertical: 10,
    borderColor: PRIMARY_COLOR,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  loginText: {
    color: PRIMARY_COLOR,
    fontSize: 15
  },
  bottomView: {
    gap: 15
  }
})

export default Login