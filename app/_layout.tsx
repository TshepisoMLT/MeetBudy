/**
 * The main layout component for the app, which sets up the navigation stack and theme provider.
 * - Loads custom fonts and hides the splash screen when fonts are loaded.
 * - Provides a consistent header style and navigation animation across the app.
 * - Includes screens for the main tab navigation, a "not found" screen, a contact screen, and a profile screen.
 */

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
import { TouchableOpacity, StatusBar, PlatformColor } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { setMB_Preferred_Theme } = useHomeStore();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.replace("/(public)/login");
    }
  }, [loaded, router]);

  const getPreferredTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("MB_Preferred_Theme");
      console.log("Stored theme: ", theme);
      if (theme === "dark" || theme === "light") {
        setMB_Preferred_Theme(theme);
        return true;
      }
      setMB_Preferred_Theme(colorScheme === "dark" ? "dark" : "light");
      return false;
    } catch (error) {
      console.error("Error reading theme from AsyncStorage:", error);
      setMB_Preferred_Theme(colorScheme === "dark" ? "dark" : "light");
      return false;
    }
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      async ({ colorScheme }) => {
        const hasTheme = await getPreferredTheme();
        if (colorScheme && !hasTheme) {
          setMB_Preferred_Theme(colorScheme === "dark" ? "dark" : "light");
        }
      }
    );

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTitleStyle: {
            fontFamily: "RobotoBold",
            fontSize: 18,
          },
          headerTitleAlign: "center",
          headerTintColor: Colors[colorScheme ?? "light"].icon,
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
          headerBackButtonMenuEnabled: true,
        }}
      >
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
            title: "",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log("Contact Us")}
                style={{ marginRight: 15 }}
              >
                <Ionicons
                  name="call-outline"
                  size={24}
                  color={Colors[colorScheme ?? "light"].tabIconSelected}
                />
              </TouchableOpacity>
            ),
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log("Edit Profile")}
                style={{ marginRight: 15 }}
              >
                <Ionicons
                  name="pencil-outline"
                  size={24}
                  color={Colors[colorScheme ?? "light"].tabIconSelected}
                />
              </TouchableOpacity>
            ),
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="messages"
          options={{
            title: "",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log("More Messages")}
                style={{ marginRight: 15 }}
              >
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={Colors[colorScheme ?? "light"].tabIconSelected}
                />
              </TouchableOpacity>
            ),
            animation: "slide_from_right",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
