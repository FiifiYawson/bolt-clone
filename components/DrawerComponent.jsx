import {
    View,
    Text,
    StyleSheet,
} from "react-native"

import {
    DrawerItemList,
    DrawerItem,
    DrawerContentScrollView
} from "@react-navigation/drawer"

import {
    PRIMARY_COLOR
} from "../config/constants"

import Icon from "react-native-vector-icons/FontAwesome5"

export default DrawerComponent = (props) => {
    return (
        <View style={styles.drawerContainer}>
            <View style={[styles.drawerSections, styles.profileSection]}>
                <View style={styles.profile}>
                    <View style={styles.userProfileIcon}>
                        <Icon  solid={true} name="user" color="#C1C1C1" size={30}/>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Fiifi</Text>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </View>
                </View>
                <View style={styles.rating}>
                    <Icon solid={true} name="star" size={12} color={PRIMARY_COLOR}/>
                    <Text style={styles.ratingText}>
                        <Text style={styles.ratingNumber}> 5.00 </Text>
                        Rating
                    </Text>
                </View>
            </View>
            <View style={[styles.drawerSections, styles.menuSection]}>

            </View>
            <View style={[styles.drawerSections, styles.bottomSection]}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContainer:{
        flex: 1,
        backgroundColor: "#D9D9D9",
        gap: 10,
    },
    drawerSections: {
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        paddingBottom: 20,
    },
    menuIcon: {
        backgroundColor: "red"
    },
    profileSection: {
        paddingTop: 50,
        gap: 20,
    },
    profile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    menuSection: {
    },
    bottomSection: {
        flexGrow: 1,
    },
    userName: {
        fontSize: 25,
        fontWeight: "600"
    },
    editProfileText: {
        fontSize: 10,
        fontWeight: "300",
        color: PRIMARY_COLOR
    },
    userProfileIcon: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: "#D9D9D9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    rating: {
        flexDirection: 'row',
        alignItems: "center"
    },
    ratingNumber: {
        fontWeight: "700",
    }
})