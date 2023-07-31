import { useEffect, useState } from "react"
import { SafeAreaView, Text, StyleSheet } from 'react-native'
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
    <SafeAreaView style={styles.appPage}>
      {loading ?
        <Splash />
        :
        <MainStackRouter />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appPage: {
    flex: 1
  }
})