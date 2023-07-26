import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import LoginRoutes from "./LoginRoutes"
import { Text } from "react-native"
import MainDrawerRoutes from "./MainDrawerRoutes"

const MainStackRouter = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="main"  screenOptions={{
                headerShown: false,
                headerShadowVisible: false
            }} >
                <Stack.Screen name='main' component={MainDrawerRoutes} />
                <Stack.Screen name='login' component={LoginRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackRouter