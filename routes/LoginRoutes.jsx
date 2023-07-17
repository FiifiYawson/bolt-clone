import { createStackNavigator } from "@react-navigation/stack"
import PhoneNumberInputScreen from "../screens/LoginScreens/PhoneNumberInputScreen"
import CodeInputScreen from "../screens/LoginScreens/CodeInputScreen"

import React from 'react'

const LoginRoutes = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName="phoneInput" screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="phoneInput" component={PhoneNumberInputScreen} />
        <Stack.Screen name="codeInput" component={CodeInputScreen} /> 
    </Stack.Navigator>
  )
}

export default LoginRoutes