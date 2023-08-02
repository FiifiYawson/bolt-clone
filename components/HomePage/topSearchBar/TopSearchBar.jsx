import {
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
    useSharedValue
} from 'react-native-reanimated'

import TopSearchBarInputField from './TopSearchBarInputField'

import closeIcon from "../../../assets/app/icons/x.png"
import plusIcon from "../../../assets/app/icons/plus.png"
import mapIcon from "../../../assets/app/icons/map.png"

import { HomePageContext } from '../../../utils/contexts'


const TopSearchBar = () => {
    const {
        animatedIndex,
        bottomSheetRef,
        setInputs,
        noOfInputs,
        inputs
    } = useContext(HomePageContext)

    const selectedInputIndex = useSharedValue(null)
    const selectedInputDragY = useSharedValue(0)

    const animatedTopSearchBarStyles = useAnimatedStyle(() => {
        const topSearchBarHeight = (40 * noOfInputs.value) + 120
        return {
            transform: [{
                translateY: interpolate(
                animatedIndex.value,
                [0, 1],
                [-topSearchBarHeight, 0])
            }],
            height: topSearchBarHeight
        }
    })

    const closeTopSearchBar = () => {
        bottomSheetRef.current.collapse(withTiming())

        setInputs((inputs) => {            
            return inputs.map((input) => {
                return {
                    ...input,
                    focused: false
                }
            })
        })
    }

    const addInput = () => {
        if (inputs.length >= 4) return
         
        setInputs((inputs) => {
            const newInputs = [...inputs]

            newInputs.splice(-1, 0, {
                value: "",
                focused: false,
                validInput: null
            })

            return [...newInputs]
        })
    }

    return (
        <Animated.View style={[styles.topSearchBar, animatedTopSearchBarStyles]}>
            <View style={styles.topSearchBarNav}>
                <TouchableWithoutFeedback onPress={closeTopSearchBar}>
                    <Image source={closeIcon} />
                </TouchableWithoutFeedback>
                <Text style={styles.topSearchBarTitle}>Your route</Text>
                <TouchableWithoutFeedback onPress={addInput}>
                    <Image source={plusIcon} onPress />
                </TouchableWithoutFeedback>
            </View>
            {inputs.map((input, index) =>
                <TopSearchBarInputField
                    key={index}
                    placeholder={index === 0 ? "Search pick-up location" : inputs.length === index + 1 ? "Destination": "Add Stop"}
                    index={index}
                    input={input}
                    setInput={setInputs}
                    addedStops={inputs.length >= 3}
                    trailingImage={input.focused ? mapIcon : null}
                    selectedInputDragY={selectedInputDragY}
                    selectedInputIndex ={ selectedInputIndex}
                />
            )}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    topSearchBar: {
        position: "absolute",
        left: 0,
        top: -1,
        width: Dimensions.get("screen").width,
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#FFFFFF",
        elevation: 10,
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
})

export default TopSearchBar