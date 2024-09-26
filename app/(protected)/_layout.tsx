import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";
import { Ionicons } from "@expo/vector-icons";

export default function AuthLayout() {
  const { MB_Preferred_Theme } = useHomeStore();
  const router = useRouter();
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
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors[MB_Preferred_Theme].background,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.navigate("/settings")}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="black"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
        name="Profile"
      />
    </Stack>
  );
}
