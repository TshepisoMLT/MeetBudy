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
  

  console.log("Hello");

  return (
    
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }}
          name="home"
        />
        <Stack.Screen
          options={{
            animation: "slide_from_left",
          }}
          name="Profile"
        />
      </Stack>
  );
}
