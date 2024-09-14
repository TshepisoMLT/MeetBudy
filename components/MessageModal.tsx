import React from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useChatsStore } from "@/stores/chatsStore";
import ReactNativeModal from "react-native-modal";
import MessageComponent from "./MessageComponent";

const ChatModal = () => {
  const colorScheme = useColorScheme();
  const { setOpenMessageModal, selectedMessage, openMessageModal } =
    useChatsStore();

  if (!selectedMessage) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ReactNativeModal
        isVisible={openMessageModal}
        onBackdropPress={() => setOpenMessageModal(false)}
        onSwipeComplete={() => setOpenMessageModal(false)}
        swipeDirection="down"
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          flex: 1,
          margin: 0,
          padding: 0,
        }}
      >
        <View
          className=" rounded-t-lg border-b border-gray-900"
          style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
        >
          <View className="flex-row justify-between items-center p-3">
            <TouchableOpacity
              onPress={() => setOpenMessageModal(false)}
              className="flex-row items-center"
            >
              <Ionicons
                name="chevron-down"
                size={28}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
            <Text
              className="text-lg font-bold ml-4 "
              style={{ color: Colors[colorScheme ?? "light"].text }}
            >
              {selectedMessage?.sender}
            </Text>
            <Text
              className="text-sm flex-1 ml-2 font-thin py-1  "
              style={{
                color: Colors[colorScheme ?? "light"].primary,
              }}
            >
              Seen : 10:23
            </Text>
          </View>
        </View>
        <View className="flex-1">
          <FlatList
            data={selectedMessage.content}
            renderItem={({ item }) => <MessageComponent message={item} />}
            keyExtractor={(item) => item.id}
            // inverted
            contentContainerStyle={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
              flex: 1,
              justifyContent: "flex-end",
              paddingHorizontal: 4,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
              if (event.nativeEvent.contentOffset.y > 0) {
                setOpenMessageModal(false);
              }
            }}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center">
                <Text
                  className="text-lg"
                  style={{ color: Colors[colorScheme ?? "light"].text }}
                >
                  Say Hi to {selectedMessage.sender}
                </Text>
              </View>
            )}
          />
        </View>
        <View className="h-20 flex-row items-center px-4 border-t border-gray-200">
          <TextInput
            placeholder="Type your message here"
            className="flex-1 py-2 px-3 rounded-full bg-gray-100"
            style={{
              color: Colors[colorScheme ?? "light"].text,
              fontSize: 16,
            }}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            className="ml-3 rounded-full p-2"
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].tabIconSelected,
            }}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default ChatModal;
