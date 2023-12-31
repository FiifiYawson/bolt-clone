import {
    View,
    TouchableWithoutFeedback,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native'

import {
    useRef,
    useEffect,
    useContext,
    useCallback,
} from "react"

import {
    PanGestureHandler,
} from "react-native-gesture-handler"

import Animated, {
    useAnimatedStyle,
    useAnimatedGestureHandler,
    interpolate,
    Extrapolate,
} from "react-native-reanimated"

import searchTrans from "../../../assets/app/icons/SearchTrans.png"
import pickUpInputIcon from "../../../assets/app/icons/pick-up-location.png"
import closeBtn from "../../../assets/app/icons/x.png"

import { PRIMARY_COLOR } from "../../../config/constants"

import { HomePageContext } from '../../../utils/contexts'

import Icon from "react-native-vector-icons/Fontisto"

import { GOOGLE_MAP_API_KEY } from "@env"


const TopSearchBarInputField = ({input, index, placeholder, trailingImage, trailImageCallback, addedStops, selectedInputDragY, selectedInputIndex }) => {
    
    const inputRef = useRef()

    const abortController = useRef()

    const {
        setInputs,
        inputs,
        setSearchPredictions,
        googlePlacesSessionToken,
    } = useContext(HomePageContext)

    const getAutoCompletePlaces = useCallback( async (text) => {
        const types = ["establishment"]
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAP_API_KEY}&sessionToken=${googlePlacesSessionToken.current}&types=${types.join("|")}`

        if(abortController.current) abortController.current.abort()

        abortController.current = new AbortController()

        try{
            if(text === "") {
                setSearchPredictions((state) => {
                    return {
                        ...state,
                        isLoading: false,
                        results: [],
                    }
                })
    
                return
            } 

            setSearchPredictions((state) => {
                return {
                    ...state,
                    isLoading: true,
                }
            })
    
            const res = await fetch(url, {
                signal: abortController.current.signal,
            })

            if (!res.ok) {
                setSearchPredictions((state) => {
                    return {
                        ...state,
                        isLoading: false,
                    }
                })    
                return
            }
        
            const data = await res.json()

            setSearchPredictions((state) => {
                return {
                    ...state,
                    results: data.predictions,
                    isLoading: false,
                }
            })    
        }catch(e){
            if(e.name === "AbortError") return

            setSearchPredictions((state) => {
                return {
                    ...state,
                    isLoading: false,
                }
            })
        }
    }, [abortController.current])

    //ensures textField unfocuses when top sheet is closed
    useEffect(()=>{
        if (!input.focused) inputRef.current.blur()
    },[input.focused])

    const setFocusOn = () => {
        setInputs((inputs) => {
            return inputs.map((input, i) => {
                if(index === i){ 
                    return {
                        ...input,
                        focused: true,
                    }
                }else{
                    return {
                        ...input,
                        focused: false
                    }
                }
            })
        })
    }

    const setFocusOff = () => {
        setInputs((inputs) => {
            return inputs.map((input, i) => {
                if(index === i){
                    return {
                        ...input,
                        focused: true,
                    }
                }else{
                    return {
                        ...input,
                        focused: false
                    }
                }
            })
        })
    }

    const changeText = (text) => {
        
        setInputs((inputs) => {
            return inputs.map((input, i)=>{
                if (i === index){
                    return {
                        ...input,
                        value: text,
                        validInput: null
                    }
                }else{
                    return input
                }
            })
        })
        
        getAutoCompletePlaces(text)
    }

    const deleteField = () => {
        if (inputs.length <= 2 || index === 0) return
        
        setInputs((inputs) => {
            return inputs.filter((input,i) => i !== index)
        })
    } 

    const rearrangeInputs = () => {
        "worklet"

        
    }

    const animtedInputFieldsRearrangeStyles = useAnimatedStyle(() => {
        const height = styles.inputFieldBox.height

        let startPoint
        let translateStyles

        if (selectedInputIndex.value === null || selectedInputIndex.value === index) {
            translateStyles = {
                transform: [
                    { translateY: selectedInputDragY.value },
                ]
            }

        } else if (selectedInputIndex.value < index) {
            startPoint = (index - selectedInputIndex.value - 1) * height

            translateStyles = {
                transform: [
                    {
                        translateY: interpolate(
                            selectedInputDragY.value,
                            [startPoint,  startPoint + height],
                            [0, -height],
                            Extrapolate.CLAMP
                        )
                    },
                ]
            }

        } else {
            startPoint = ((index - selectedInputIndex.value) + 1) * height

            translateStyles =  {
                transform: [
                    {
                        translateY: interpolate(
                            selectedInputDragY.value,
                            [startPoint,  startPoint - height],
                            [0, height],
                            Extrapolate.CLAMP
                        )
                    }
                ]
            }
        }

        return {...translateStyles}
    })

    const rearrangeGestureHandler = useAnimatedGestureHandler({
        onStart: () => {
            selectedInputIndex.value = index
        },
        onActive: (event) => {
            const maxDragUp = -selectedInputIndex.value * (styles.inputFieldBox.height)
            const maxDragDown = (inputs.length - 1 - selectedInputIndex.value) * (styles.inputFieldBox.height)

            selectedInputDragY.value = interpolate(
                event.translationY,
                [maxDragUp, maxDragDown],
                [maxDragUp, maxDragDown],
                Extrapolate.CLAMP
            )
        },
        onEnd: () => {
            rearrangeInputs()
            selectedInputDragY.value = 0
            selectedInputIndex.value = null
        }
    })

    return (
        <View style={styles.inputLayout}>
            <TouchableWithoutFeedback onPress={()=>{}}>
                <Animated.View focusable
                 style={[
                    styles.inputFieldBox,
                    (index === 0 && !input.focused) ? styles.pickUpInputField : {},
                    (index === inputs.length - 1 && !input.focused ) ? styles.dropOffInputField : {},
                    input.focused ? styles.inputFieldBoxFocus : {},
                    animtedInputFieldsRearrangeStyles
                ]}>

                    <Image source={input.focused ? searchTrans : pickUpInputIcon} style={styles.inputFieldImage}/>
                    <TextInput
                        enterKeyHint="search"
                        placeholder={placeholder}
                        value={input.validInput ? input.validInput.name : input.value}
                        ref={inputRef}
                        onFocus={setFocusOn}
                        onBlur={setFocusOff}
                        onChangeText={changeText}
                        style={styles.textInputFields}
                    />
                    {trailingImage && <Image source={trailingImage} />}
                    {addedStops && 
                        <PanGestureHandler onGestureEvent={rearrangeGestureHandler}>
                            <Animated.View>
                                <Icon name='nav-icon-grid-a' color="#D9D9D9" />
                            </Animated.View>
                        </PanGestureHandler>
                    }

                </Animated.View>
            </TouchableWithoutFeedback>
            {addedStops &&
                <TouchableWithoutFeedback onPress={deleteField}>
                    <Image source={closeBtn} style={ index === 0 ? {opacity: 0} : {} } />
                </TouchableWithoutFeedback>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputLayout: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 10,
    },
    inputFieldBox: {
        flexGrow: 1,
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "#F1F1F1"
    },
    pickUpInputField: {
        borderTopStartRadius: 8,
        borderTopEndRadius: 8
    },
    dropOffInputField: {
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
    },
    inputFieldBoxFocus: {
        borderColor: PRIMARY_COLOR,
        borderRadius: 8,
        elevation: 1000,
        zIndex: 1000,
    },
    textInputFields: {
        flexGrow: 1
    }
})

export default TopSearchBarInputField