import {createDrawerNavigator} from "@react-navigation/drawer"
import HomeScreen from "../screens/HomeScreen"
import DrawerComponent from "../components/DrawerComponent"
import { TouchableOpacity } from "react-native-gesture-handler"

export default DrawerRouter = () => {
    const drawer = createDrawerNavigator()

    return(
        <drawer.Navigator 
            initialRouteName="home" 
            screenOptions={{
                title: "",
                headerShown: false
            }}
            drawerContent={DrawerComponent}
        >

            <drawer.Screen name="home" component={HomeScreen}/>
            
        </drawer.Navigator>
    )
}