import screenStyles from "../styles/screenStyle"

import {
  useRef,
  useState,
  useEffect,
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

import * as Geolocation from "expo-location"

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
      value: "",
      validInput: null
    },{
      focused: false,
      value: "",
      validInput: null
    }
  ])
  
  const [searchPredictions, setSearchPredictions] = useState({
    isLoading: false,
    results: []
  })

  const [currentPosition, setCurrentPosition] = useState({
    longitude: 0,
    latitude: 0,
  })

  // open and sets Map when valid inputs are provided
  useEffect(()=>{
    if(inputs.every(input => input.validInput !== null)){
      setUpMap(inputs.map(input => input.validInput.id))
    }
  },[inputs])

  // grabs and sets user location
  useEffect(()=>{
      Geolocation.requestForegroundPermissionsAsync().then(()=>{
        Geolocation.watchPositionAsync({accuracy: Geolocation.Accuracy.Highest },(position)=>{
          setCurrentPosition({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
        }).catch((e) => {
            console.log(e)
        })
      });
  },[])

  const googlePlacesSessionToken = useRef(uuid.v4())

  const setUpMap = () => {}

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
          showsUserLocation
          region={currentPosition}
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
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  }
})

export default Home