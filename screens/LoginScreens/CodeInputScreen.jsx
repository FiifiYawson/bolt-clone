import {useState, useRef} from "react"
import { View, Text, TextInput, StyleSheet} from 'react-native'
import screenStyle from '../../styles/screenStyle' 
import textStyles from '../../styles/textStyles'
import { PRIMARY_COLOR } from "../../config/constants"
import GreenButton from "../../components/GreenButton"
    
const CodeInputScreen = ({navigation}) => {
    const [inputs, setInputs] = useState([
        {
            isFocused: false,
            value: null
        },
        {
            isFocused: false,
            value: null
        },
        {
            isFocused: false,
            value: null
        },
        {
            isFocused: false,
            value: null
        }
    ])

    const inputRefs = inputs.map(() => useRef())
    const inputValues= inputs.map(input => input.value)

    const changeInputStyleOnFocus = (e, index) => {
        setInputs((inputs) => {
            inputs[index].isFocused = true

            return [...inputs]
        })
    }

    const changeInputStyleOnBlur = (e, index) => {
        setInputs((inputs) => {
            inputs[index].isFocused = false

            return [...inputs]
        })
    }

    const keypress = (e, index) => {
        const key = e.nativeEvent.key

        const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        
        if (!validKeys.includes(key)) return

        if(index !== inputs.length - 1) inputRefs[index + 1].current.focus()

        setInputs((inputs) => {
            inputs[index].value = key

            return [...inputs]
        })
    }

    return (
        <View style={{ ...screenStyle.page, ...styles.page }}>
            <View>
                <Text style={textStyles.headText}>Enter Code</Text>
                <Text style={styles.thinText}>An SMS Code was sent to</Text>
                <Text style={styles.phoneNumber}>Phone Number</Text>
                <Text style={styles.editText}>Edit phone number</Text>
                <View style={styles.codeInputContainer}>
                    {inputs.map((item, index) => <TextInput
                        ref={inputRefs[index]}
                        maxLength={1}
                        inputMode="numeric"
                        value={item.value}
                        key={index}
                        onFocus={e => changeInputStyleOnFocus(e,index)}
                        onBlur={e => changeInputStyleOnBlur(e, index)}
                        onKeyPress={e => keypress(e, index)}
                        style={item.isFocused ? {...styles.codeInput, ...styles.codeInputHover} : styles.codeInput }
                        textAlign="center"
                        caretHidden={true}
                    /> )} 
                </View>
            </View>
            <View>
                <Text>Resend code in <Text>16</Text></Text>
                <GreenButton nextRoute="home" navigation={navigation} title="CONTINUE" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        justifyContent: "space-between"
    },
    codeInput: {
        backgroundColor: "#C4C4C4c4",
        borderRadius: 5,
        width: 76,
        height: 54,
        fontSize: 30,
    },
    codeInputHover: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
    },
    codeInputContainer: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 20
    },
    thinText: {
        fontSize: 20,
        fontWeight: "100"
    },
    phoneNumber: {
        fontSize: 23,
    },
    editText: {
        color: PRIMARY_COLOR,
        fontSize: 18
    }
})

export default CodeInputScreen