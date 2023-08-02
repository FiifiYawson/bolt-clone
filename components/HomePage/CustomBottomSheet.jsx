import {
    useContext
} from "react"

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'

import BottomSheet, {
    BottomSheetView,
} from "@gorhom/bottom-sheet"

import {
  TapGestureHandler,
} from "react-native-gesture-handler"

import Animated, {
    withTiming,
    useAnimatedStyle,
    useSharedValue,
    interpolateColor,
} from "react-native-reanimated"

import { HomePageContext } from "../../utils/contexts"

import {createShimmerPlaceholder} from "react-native-shimmer-placeholder"

import LinearGradient from 'expo-linear-gradient';

import search from "../../assets/app/icons/search.png"

import Icon from "react-native-vector-icons/EvilIcons"


const CustomBottomSheet = () => {
    const snapPoints = [286, "100%"]

    const Placeholder = createShimmerPlaceholder(LinearGradient)

    const {
        animatedIndex,
        bottomSheetRef,
        searchPredictions,
        noOfInputs,
        setInputs,
    } = useContext(HomePageContext)

    // shared values for search button splash effect
    const radius = useSharedValue(0)
    const splashEffectLeft = useSharedValue(0)
    const splashEffectTop = useSharedValue(0)

    const setValidInput = (data) => {
        setInputs((inputs) => {
            return inputs.map((input)=> {
                if(input.focused){
                    return {
                        ...input,
                        validInput:{
                            id: data.place_id,
                            name: data.structured_formatting.main_text
                        }
                    }
                }else{
                    return input
                }
            })
        })
    }

    const searchButtonSplashEffect = (event) => {
        splashEffectLeft.value = event.nativeEvent.x
        splashEffectTop.value = event.nativeEvent.y

        bottomSheetRef.current.expand(withTiming())

        radius.value = withTiming(500, {duration: 100}, () =>
            radius.value = 0
        )
    }

    const animatedButtonSplashEffectStyles = useAnimatedStyle(() => {
        return {
            left: splashEffectLeft.value - radius.value,
            top: splashEffectTop.value - radius.value,
            borderRadius: radius.value,
            backgroundColor: interpolateColor(radius.value, [0, 500], ["grey", "transparent"]),
            width: radius.value * 2,
            height: radius.value * 2,
        }
    })

    const animatedBottomSheetPaddingTopAdjustment = useAnimatedStyle(()=>{
        return {
            paddingTop: 70 + noOfInputs.value * 40
        }
    })
    
    return (
        <BottomSheet
            index={0}
            animatedIndex={animatedIndex}
            snapPoints={snapPoints}
            keyboardBehavior="interactive"
            ref = {bottomSheetRef}
            style={styles.bottomSheetContainer}
        >

            <BottomSheetView style={styles.bottomSheet}>
                <TapGestureHandler onActivated={searchButtonSplashEffect} style={styles.destinationSearchBoxTextContainer} >
                    <View style={styles.destinationSerchBox}>
                        <Animated.View style={[styles.buttonSplashEffect, animatedButtonSplashEffectStyles]} />
                        <Image source={search} style={{borderRadius: 30}} />
                        <Text style={styles.destinationSearchBoxText}>Where to?</Text>
                    </View>
                </TapGestureHandler>

                <Animated.View style={[animatedBottomSheetPaddingTopAdjustment]}>
                    {searchPredictions.isLoading ? 
                        <View >
                            <Placeholder width={300} height={20} style={{marginBottom: 10, borderRadius: 10}}/>
                            <Placeholder width={70} height={13} style={{marginBottom: 20, borderRadius: 10}}/>
                        </View>
                        
                        :

                        searchPredictions.results.map(data =>
                            <TouchableOpacity key={data.place_id} onPress={() => setValidInput(data)}  >
                                <View style={styles.placeSuggestionTile}>
                                    <Icon name="location" size={40}  />
                                    <View>
                                        <Text style={styles.suggestionHead} numberOfLines={1} ellipsizeMode="tail">
                                            {data.structured_formatting.main_text}
                                        </Text>
                                        <Text style={styles.suggestionBody}  numberOfLines={1} ellipsizeMode="tail">
                                            {data.description}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </Animated.View>
            </BottomSheetView>

        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    destinationSerchBox:{
        width: "100%",
        height: 49,
        backgroundColor: "#F1F1F1",
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        position: "relative",
        overflow: "hidden"
    },
    destinationSearchBoxText: {
        fontSize: 16,
        fontWeight: "700",
    },
    destinationSearchBoxTextContainer: {
        flexGrow: 1,
        justifyContent: "center",
        height: "100%",
        justifyContent: "center",
    },
    bottomSheetContainer: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 100,
        elevation: 30,
        borderRadius: 24,
    },
    bottomSheet: {
        paddingHorizontal: 20
    },
    buttonSplashEffect: {
        position: "absolute",
    },
    placeSuggestionTile:{
        borderBottomWidth: 1,
        borderColor: "#D9D9D9",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,ellipsizeMode: "tail",
        overflow: "hidden"
    },
    suggestionHead: {
        fontSize: 15
    },
    suggestionBody: {
        fontSize: 10,
        color: "#AAAAAA"
    },
})

export default CustomBottomSheet