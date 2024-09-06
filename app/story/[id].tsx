import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Story() {
  const { details } = useLocalSearchParams();
  const {user} = useGlobalSearchParams()
  const colorScheme = useColorScheme();
  
  console.log(details,user);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Text className="text-blue-500 text-center font-bold text-2xl">
        Hello {details}
      </Text>
    </SafeAreaView>
  );
}
