import {
    View,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native'

import searchTrans from "../../../assets/app/icons/SearchTrans.png"
import pickUpInputIcon from "../../../assets/app/icons/pick-up-location.png"

import { PRIMARY_COLOR } from "../../../config/constants"


const TopSearchBarInputField = ({input, setInput, inputRef, trailingImage, trailImageCallback}) => {
  return (
    <TouchableWithoutFeedback onPress={()=> inputRef.current.focus()}>
        <View style={ input.focused ? {...styles.inputFieldBox, ...styles.inputFieldBoxFocus}: styles.inputFieldBox}>
            <Image source={input.focused ? searchTrans : pickUpInputIcon} style={styles.inputFieldImage}/>
            <TextInput
                enterKeyHint="search"
                ref={inputRef}
                value={input.value}
                onFocus={() => setInput({
                    ...input,
                    focused: true
                })}
                onBlur={() => setInput({
                    ...input,
                    focused: false
                })}
                onChangeText={(text) => setInput({
                    ...input,
                    value: text
                })}
                style={styles.textInputFields}
            />
            {trailingImage && <Image source={trailingImage} />}
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    inputFieldBox: {
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderRadius: 8,
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
    },
    inputFieldBoxFocus: {
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        backgroundColor: "#FFFFFF",
    },
    textInputFields: {
        flexGrow: 1
    }
})

export default TopSearchBarInputField