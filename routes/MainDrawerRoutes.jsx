import {createDrawerNavigator} from "@react-navigation/drawer"
import HomeScreen from "../screens/HomeScreen"
import DrawerComponent from "../components/DrawerComponent"

export default DrawerRouter = () => {
    const drawer = createDrawerNavigator()

    return(
        <drawer.Navigator 
            initialRouteName="home" 
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={DrawerComponent}
        >

            <drawer.Screen name="home" component={HomeScreen}/>
            
        </drawer.Navigator>
    )
}