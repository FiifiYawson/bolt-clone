import { View, Image, StyleSheet } from 'react-native'
import boltLogo from "../assets/app/images/bolt-logo-white.png"
import { PRIMARY_COLOR } from '../config/constants'

const splash = () => {
  return (
    <View style={{...styles.splashScreen} }>
      <Image
        source={boltLogo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  splashScreen: {
    backgroundColor: PRIMARY_COLOR,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default splash