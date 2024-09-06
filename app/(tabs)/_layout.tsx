import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        tabBarStyle: {
          height: -20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            height:100,
          },
          headerShown:true,
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
          headerRight: () => (
            <View className="mr-4 rounded-full p-2">
              <TabBarIcon
                name="settings-outline"
                color={Colors[colorScheme ?? "light"].tint}
              />
            </View>
          ),
          headerTitle: "MeetBudy",
          headerTitleAlign: "center",
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
