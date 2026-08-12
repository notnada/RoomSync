import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export default function RootLayout() {
  const [fontsloaded] = useFonts({
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-Italic": require("../assets/fonts/PlusJakartaSans-Italic.ttf"),
    "PlusJakartaSans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  })
  useEffect(() => {
    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded]);
  if (!fontsloaded) { return null; }  
  return <Stack screenOptions={{headerShown:false}} />;
}
