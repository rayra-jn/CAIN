import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const isDev = __DEV__;

export default function Layout() {
  const [loaded, error] = useFonts({
    VGA: isDev
    ? require("../assets/fonts/VT323-Regular.ttf")
    : require("../assets/fonts/PxPlus_IBM_VGA8.ttf"),
  VT: require("../assets/fonts/VT323-Regular.ttf"),
  });

 useEffect(() => {
    // garante que não fica preso
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
