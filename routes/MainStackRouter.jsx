import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../screens/HomeScreen"
import LoginRoutes from "./LoginRoutes"
import { Text } from "react-native"

const MainStackRouter = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login"  screenOptions={{
                headerShown: false,
                headerShadowVisible: false
            }} >
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='login' component={LoginRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackRouter