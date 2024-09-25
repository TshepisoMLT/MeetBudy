import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "react-native";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const { MB_Preferred_Theme } = useHomeStore();

  const [fontsLoaded] = useFonts({
    // Add your custom fonts here
    // 'CustomFont-Regular': require('../assets/fonts/CustomFont-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={MB_Preferred_Theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar
        barStyle={
          MB_Preferred_Theme === "dark" ? "light-content" : "dark-content"
        }
        backgroundColor={Colors[MB_Preferred_Theme ?? "light"].border}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
          name="login"
        />
        <Stack.Screen
          options={{
            animation: "slide_from_left",
          }}
          name="signup"
        />
      </Stack>
    </ThemeProvider>
  );
}
