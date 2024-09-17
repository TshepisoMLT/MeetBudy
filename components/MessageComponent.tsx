import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";

type Message = {
  id: string;
  message: string;
  timestamp: string;
  sender: string;
};

const MessageComponent = ({ message }: { message: Message }) => {
  const isUserMessage = message.sender.toLowerCase() === "user";
  const { MB_Preferred_Theme } = useHomeStore();
  return (
    <View
      className={`max-w-[80%] my-2 p-3 rounded-2xl ${
        isUserMessage
          ? "self-end bg-blue-500 rounded-tr-none"
          : "self-start bg-gray-200 rounded-tl-none"
      }`}
    >
      <Text
        className={`text-base mb-2 ${
          isUserMessage ? "text-white" : "text-black"
        }`}
      >
        {message.message}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-xs ${
            isUserMessage ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        {isUserMessage && (
          <Ionicons
            name="checkmark-done"
            size={16}
            color={Colors[MB_Preferred_Theme ?? "light"].accent}
          />
        )}
      </View>
      {/* <TouchableOpacity
        className="absolute -bottom-6 right-0"
        onPress={() => {
          // Handle long press actions like copy, delete, etc.
        }}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#888" />
      </TouchableOpacity> */}
    </View>
  );
};

export default MessageComponent;
