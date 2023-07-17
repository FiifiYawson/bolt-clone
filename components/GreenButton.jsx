import { Text, View, TouchableOpacity, StyleSheet } from "react-native"
import { PRIMARY_COLOR } from "../config/constants"

export default function GreenButton({title, navigation, nextRoute}) {
    return (
        <TouchableOpacity onPress={() => navigation.push(nextRoute)} style={styles.greenBtn} opacity={0.6}>
            <Text style={styles.greenBtnText}>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    greenBtn: {
        backgroundColor: PRIMARY_COLOR,
        marginVertical: 20,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100/2      
    },
    greenBtnText: {
        color: "#FFFFFF",
        fontSize: 18,
    }
})