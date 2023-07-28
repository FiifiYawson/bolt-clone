import screenStyles from "../styles/screenStyle"

import {
  useRef,
  useState,
} from "react"

import {
  View,
  TouchableOpacity,
  Text,
} from "react-native"

import {
  useSharedValue
} from "react-native-reanimated"

import TopSearchBar from "../components/HomePage/topSearchBar/TopSearchBar"

import { HomePageContext } from "../utils/contexts"

import CustomBottomSheet from "../components/HomePage/CustomBottomSheet"


const Home = ({navigation}) => {  

  const bottomSheetRef = useRef()

  const [inputs, setInputs] = useState([{
    focused: false,
    value: ""
  },{
    focused: false,
    value: ""
  }])


  // animated bottom Sheet index
  const animatedIndex = useSharedValue(1)

  const props = {
    bottomSheetRef,
    animatedIndex,
    inputs,
    setInputs,
  }

  return (
    <HomePageContext.Provider value={props}>
      <View style={screenStyles.page}>
        <CustomBottomSheet />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={{
            position:"absolute",
            top: 20,
            left: 20
          }}>
          <Text>Drawer Button</Text>
          </View>
        </TouchableOpacity>
        <TopSearchBar/>
      </View>
    </HomePageContext.Provider>
  )
}

export default Home