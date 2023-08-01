import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from 'react-native'
import Splash from "./screens/SplashScreen"
import MainStackRouter from "./routes/MainStackRouter"

export default function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  })

  return (
    <View style={styles.appPage}>
      {loading ?
        <Splash />
        :
        <MainStackRouter />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  appPage: {
    flex: 1
  }
})