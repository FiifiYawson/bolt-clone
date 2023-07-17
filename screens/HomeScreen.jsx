import screenStyles from "../styles/screenStyle"

import {
  useRef
} from "react"

import {
  View
} from "react-native"

import {
  useSharedValue
} from "react-native-reanimated"

import TopSearchBar from "../components/HomePage/topSearchBar/TopSearchBar"

import { HomePageContext } from "../utils/contexts"

import CustomBottomSheet from "../components/HomePage/CustomBottomSheet"


const Home = () => {  

  const pickUpInputRef = useRef()
  const dropOffInputRef = useRef()

  const bottomSheetRef = useRef()

  // animated bottom Sheet index
  const animatedIndex = useSharedValue(1)

  const props = {
    pickUpInputRef,
    dropOffInputRef,
    bottomSheetRef,
    animatedIndex,
  }

  return (
    <HomePageContext.Provider value={props}>
      <View style={screenStyles.page}>
        <CustomBottomSheet />
        
        <TopSearchBar/>
      </View>
    </HomePageContext.Provider>
  )
}

// const styles = StyleSheet.create({
// })

export default Home