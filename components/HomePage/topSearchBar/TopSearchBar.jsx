import {
    useState,
    useContext
} from 'react'

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import Animated, {
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated'

import TopSearchBarInputField from './TopSearchBarInputField'

import closeIcon from "../../../assets/app/icons/x.png"
import plusIcon from "../../../assets/app/icons/plus.png"
import mapIcon from "../../../assets/app/icons/map.png"

import { HomePageContext } from '../../../utils/contexts'


const TopSearchBar = () => {
    const [pickUpInput, setPickUpInput] = useState({
        focused: false,
        value: ""
    })

    const [dropOffInput, setDropOffInput] = useState({
        focused: false,
        value: ""
    })

    const {
        pickUpInputRef,
        dropOffInputRef,
        animatedIndex,
        bottomSheetRef,
    } = useContext(HomePageContext)

    const animatedTopSearchBarStyles = useAnimatedStyle(() => {
        return {
        transform: [{
            translateY: interpolate(
            animatedIndex.value,
            [0, 1],
            [-styles.topSearchBar.height, 0])
        }],
        }
    })

    const closeTopSearchBar = () => {
        pickUpInputRef.current.blur()
        dropOffInputRef.current.blur()
        bottomSheetRef.current.collapse(withTiming())
    }

    return (
        <Animated.View style={[styles.topSearchBar, animatedTopSearchBarStyles]}>
            <View style={styles.topSearchBarNav}>
                <TouchableWithoutFeedback onPress={closeTopSearchBar}>
                    <Image source={closeIcon} />
                </TouchableWithoutFeedback>
                <Text style={styles.topSearchBarTitle}>Your route</Text>
                <Image source={plusIcon} />
            </View>
            <View style={styles.inputFieldsBoxContainer} >
                <TopSearchBarInputField
                    inputRef={pickUpInputRef}
                    input={pickUpInput}
                    setInput={setPickUpInput}
                />

                <TopSearchBarInputField
                    inputRef={dropOffInputRef}
                    input={dropOffInput}
                    setInput={setDropOffInput}
                    trailingImage={mapIcon}
                />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    topSearchBar: {
        position: "absolute",
        left: 0,
        top: -1,
        width: Dimensions.get("screen").width,
        height: 270,
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 50,
    },
    topSearchBarNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    topSearchBarTitle: {
        fontSize: 16,
        fontWeight: "700"
    },
    inputFieldsBoxContainer: {
        backgroundColor: "#F1F1F1",
        borderRadius: 8,
    },
})

export default TopSearchBar