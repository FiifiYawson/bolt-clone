import screenStyles from "../styles/screenStyle"

import {
  useRef,
  useState,
} from "react"

import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native"

import {
  useDerivedValue,
  useSharedValue,
  withTiming, 
} from "react-native-reanimated"

import TopSearchBar from "../components/HomePage/topSearchBar/TopSearchBar"

import { HomePageContext } from "../utils/contexts"

import CustomBottomSheet from "../components/HomePage/CustomBottomSheet"

import menuIcon from "../assets/app/icons/menu.png"

import MapView from "react-native-maps"

import uuid from "react-native-uuid"


const Home = ({navigation}) => {  

  const bottomSheetRef = useRef()

  const [inputs, setInputs] = useState([
    {
      focused: false,
      value: ""
    },{
      focused: false,
      value: ""
    }
  ])

  console.log(inputs)
  
  const [searchPredictions, setSearchPredictions] = useState({
    isLoading: false,
    results: []
  })

  const googlePlacesSessionToken = useRef(uuid.v4())

  const animatedIndex = useSharedValue(1)
  const noOfInputs = useDerivedValue(()=> withTiming(inputs.length) ,[inputs.length])

  const props = {
    bottomSheetRef,
    animatedIndex,
    inputs,
    setInputs,
    searchPredictions,
    setSearchPredictions,
    googlePlacesSessionToken,
    noOfInputs
  }

  return (
    <HomePageContext.Provider value={props}>
      <View style={screenStyles.page}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <CustomBottomSheet />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.menuIconContainer}>
            <Image source={menuIcon} style={styles.topMenuIcon} />
          </View>
        </TouchableOpacity>
        <TopSearchBar/>
      </View>
    </HomePageContext.Provider>
  )
}

const styles= StyleSheet.create({
  topMenuIcon:{
    position: "relative",
    margin: 0,
    padding: 0,
  },
  menuIconContainer: {
    position:"absolute",
    borderRadius: 50/2,
    width: 50,
    height: 50,
    elevation: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  map:{
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  }
})

export default Home