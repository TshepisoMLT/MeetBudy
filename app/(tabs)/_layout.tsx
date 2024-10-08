/**
 * Defines the TabLayout component, which is the main layout for the application's tabs.
 * This component sets up the Expo Router Tabs with various configuration options, such as:
 * - Setting the active tab color based on the current color scheme
 * - Showing the header and configuring its style
 * - Setting the tab bar style
 * - Defining the header left and right components (user avatar and settings icon)
 * - Setting the header title and its alignment and style
 */
import { router, Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHomeStore } from "@/stores/homeStore";

// Define the TabLayout component
export default function TabLayout() {
  // Get the current color scheme
  const { MB_Preferred_Theme } = useHomeStore();
  return (
    <Tabs
      screenOptions={{
        // Set the active tab color based on the color scheme
        tabBarActiveTintColor: Colors[MB_Preferred_Theme ?? "light"].tint,
        // Show the header
        headerShown: true,
        // Set the header style
        headerStyle: {
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
        },
        // Show header shadow
        headerShadowVisible: true,
        // Set the tab bar style (Note: negative height might cause issues)
        tabBarStyle: {
          height: -100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // Set the title of the screen
          title: "Home",
          // Set the header style for this specific screen
          headerStyle: {
            backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
            height: 100,
          },
          // Show the header
          headerShown: true,
          // Define the header left component (user avatar)
          headerLeft: () => (
            <TouchableOpacity
              // Navigate to profile screen on press
              onPress={() => router.push("/login")}
              className="ml-4 h-12 w-12 rounded-full bg-slate-300"
            >
              <Image
                // Set the source of the image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/10.jpg",
                }}
                className="w-full h-full rounded-full"
              />
            </TouchableOpacity>
          ),
          // Define the header right component (settings icon)
          headerRight: () => (
            <View className="mr-4 rounded-full flex flex-row ">
              <TouchableOpacity
                // Navigate to contact screen on press
                onPress={() => router.push("/messages")}
                className="rounded-full p-2"
              >
                <Ionicons
                  name="chatbubble-outline"
                  // Set the color based on the color scheme
                  color={Colors[MB_Preferred_Theme ?? "light"].tint}
                  size={28}
                />
              </TouchableOpacity>
              <TouchableOpacity
                // Navigate to contact screen on press

                onPress={() => router.push("/settings")}
                className="rounded-full  p-2"
              >
                <Ionicons
                  name="settings-outline"
                  // Set the color based on the color scheme
                  color={Colors[MB_Preferred_Theme ?? "light"].tint}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          ),
          // Set the header title
          headerTitle: "MeetBudy",
          // Center align the header title
          headerTitleAlign: "center",
          // Style the header title
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            // Set the color based on the color scheme
            color: Colors[MB_Preferred_Theme ?? "light"].tint.toString(),
          },
        }}
      />
    </Tabs>
  );
}
