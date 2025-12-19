import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SessionProvider } from "./session";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    VGA: require("../assets/fonts/PxPlus_IBM_VGA8.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SessionProvider>
  );
}
