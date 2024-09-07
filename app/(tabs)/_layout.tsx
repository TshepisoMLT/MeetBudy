import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, View } from "react-native";

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
        headerShadowVisible:true,
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
            <View className="ml-4 h-12 w-12 rounded-full bg-slate-300">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/10.jpg",
                }}
                className="w-full h-full rounded-full"
              />
            </View>
          ),
          // Define the header right component (settings icon)
          headerRight: () => (
            <View className="mr-4 rounded-full p-2">
              <TabBarIcon
                name="settings-outline"
                color={Colors[colorScheme ?? "light"].tint}
              />
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
            color: Colors[colorScheme ?? "light"].tint.toString(),
          },
        }}
      />
    </Tabs>
  );
}

