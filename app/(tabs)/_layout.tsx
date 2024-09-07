/**
 * Defines the main tab layout for the application, including the header and tab bar.
 * The tab layout includes a home screen with a user avatar and settings icon in the header.
 * The tab bar and header styles are configured based on the current color scheme.
 */
import { router, Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define the TabLayout component
export default function TabLayout() {
  // Get the current color scheme
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Set the active tab color based on the color scheme
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Show the header
        headerShown: true,
        // Set the header style
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerShadowVisible: true,
        // Set the tab bar style (Note: negative height might cause issues)
        tabBarStyle: {
          height: -50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // Set the header style for this specific screen
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            height: 100,
          },
          headerShown: true,
          // Define the header left component (user avatar)
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="ml-4 h-12 w-12 rounded-full bg-slate-300"
            >
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/10.jpg",
                }}
                className="w-full h-full rounded-full"
              />
            </TouchableOpacity>
          ),
          // Define the header right component (settings icon)
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/contact")}
              className="mr-4 rounded-full p-2"
            >
              <Ionicons
                name="settings-outline"
                color={Colors[colorScheme ?? "light"].tint}
                size={28}
              />
            </TouchableOpacity>
          ),
          // Set the header title
          headerTitle: "MeetBudy",
          // Center align the header title
          headerTitleAlign: "center",
          // Style the header title
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: Colors[colorScheme ?? "light"].tint.toString(),
          },
        }}
      />
    </Tabs>
  );
}

