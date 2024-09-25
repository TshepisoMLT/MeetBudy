/**
 * The main layout component for the app, which sets up the navigation stack and theme provider.
 * - Loads custom fonts and hides the splash screen when fonts are loaded.
 * - Provides a consistent header style and navigation animation across the app.
 * - Includes screens for the main tab navigation, a "not found" screen, a contact screen, and a profile screen.
 */
import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  TouchableOpacity,
  StatusBar,
  PlatformColor,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/helper/tokenCache";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function NavigationLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { setMB_Preferred_Theme } = useHomeStore();

  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();

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

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(public)";

    if (!isSignedIn) {
      console.log("Is signed in: ", isSignedIn, " navigate to login");
      router.replace("/login");
    }
    if (!inTabsGroup && !isSignedIn) {
      console.log(
        "Is signed in: ",
        isSignedIn,
        " in tabs groups",
        inTabsGroup,
        " navigate to login"
      );
      router.replace("/login");
    } else {
      console.log("Is signed in: ", isSignedIn, " navigate to protected");
      router.replace("/home");
    }
  }, [isSignedIn]);

  return (
    <>
      {isLoaded && (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isSignedIn ? (
            <Stack.Screen name="(public)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          )}
        </Stack>
      )}
    </>
  );
}

if (!publishableKey) {
  
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { MB_Preferred_Theme } = useHomeStore();
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={MB_Preferred_Theme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StatusBar
              barStyle={
                MB_Preferred_Theme === "dark" ? "light-content" : "dark-content"
              }
              backgroundColor={Colors[MB_Preferred_Theme ?? "light"].background}
            />
            <NavigationLayout />
          </ThemeProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
