import {
    View,
    Text,
} from "react-native"

import {
    DrawerItemList,
    DrawerItem
} from "@react-navigation/drawer"

export default DrawerComponent = (props) => {
    return (
        <View 
            style={{
                height: "100%", 
                width: "100%", 
                backgroundColor: "red"
            }}
        >
            <DrawerItemList {...props} >
                <DrawerItem {...props} onPress={()=>console.log("hello")}>
                    <Text>Hello</Text>
                </DrawerItem>
            </DrawerItemList>
        </View>
    )
}