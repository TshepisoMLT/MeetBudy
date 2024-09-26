import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useHomeStore } from "@/stores/homeStore";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const router = useRouter();
  const { MB_Preferred_Theme } = useHomeStore();
  const { user } = useUser();

  return (
    <View
      style={{
        backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
      }}
      className="justify-between flex-row items-center p-3 shadow-sm shadow-slate-400"
    >
      <TouchableOpacity
        onPress={() => router.push("/Profile")}
        className="h-12 w-12 rounded-full bg-slate-300"
      >
        <Image
          source={{
            uri:
              user?.imageUrl ??
              "https://randomuser.me/api/portraits/men/10.jpg",
          }}
          className="w-full h-full rounded-full"
        />
      </TouchableOpacity>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          color: Colors[MB_Preferred_Theme ?? "light"].tint,
        }}
      >
        MeetBudy
      </Text>

      <View className="flex flex-row">
        <TouchableOpacity
          onPress={() => router.push("/messages")}
          className="rounded-full p-2"
        >
          <Ionicons
            name="chatbubble-outline"
            color={Colors[MB_Preferred_Theme ?? "light"].icon}
            size={28}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          className="rounded-full p-2"
        >
          <Ionicons
            name="notifications-outline"
            color={Colors[MB_Preferred_Theme ?? "light"].icon}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
