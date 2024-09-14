import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useChatsStore } from "@/stores/chatsStore";
import MessageModal from "@/components/MessageModal";

// Define types for messages and notifications
type Message = {
  id: string;
  sender: string;
  content: {
    id: string;
    message: string;
    timestamp: string;
    sender: string;
  }[];
  timestamp: string;
};

type Notification = {
  id: string;
  type: "like" | "comment" | "follow";
  content: string;
  timestamp: string;
};

// Define the MessagesPage component
const MessagesPage: React.FC = () => {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState<"messages" | "notifications">(
    "messages"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { setOpenMessageModal, setSelectedMessage, openMessageModal } =
    useChatsStore();

  const handleMessageClick = (item: Message) => {
    setOpenMessageModal(true);
    setSelectedMessage(item);
  };

  // Sample data (replace with actual data fetching logic)
  const messages: Message[] = [
    {
      id: "1",
      sender: "John Doe",
      content: [
        {
          id: "1a",
          message: "Hey, how are you?",
          timestamp: "2023-06-10T10:30:00Z",
          sender: "John Doe",
        },
        {
          id: "1b",
          message: "I've been trying to reach you.",
          timestamp: "2023-06-10T10:31:00Z",
          sender: "John Doe",
        },
        {
          id: "1c",
          message: "Hi John! I'm good, thanks. Sorry I missed your messages.",
          timestamp: "2023-06-10T11:00:00Z",
          sender: "user",
        },
        {
          id: "1d",
          message: "No worries. What have you been up to?",
          timestamp: "2023-06-10T11:02:00Z",
          sender: "John Doe",
        },
      ],
      timestamp: "2023-06-10T10:30:00Z",
    },
    {
      id: "2",
      sender: "Jane Smith",
      content: [
        {
          id: "2a",
          message: "Did you see the latest post?",
          timestamp: "2023-06-09T15:45:00Z",
          sender: "Jane Smith",
        },
        {
          id: "2b",
          message: "It's really interesting!",
          timestamp: "2023-06-09T15:46:00Z",
          sender: "Jane Smith",
        },
        {
          id: "2c",
          message: "Yes, I did! It was very informative.",
          timestamp: "2023-06-09T16:00:00Z",
          sender: "user",
        },
        {
          id: "2d",
          message: "I'm glad you found it interesting too!",
          timestamp: "2023-06-09T16:02:00Z",
          sender: "Jane Smith",
        },
        {
          id: "2e",
          message: "Do you want to discuss it further?",
          timestamp: "2023-06-09T16:03:00Z",
          sender: "user",
        },
      ],
      timestamp: "2023-06-09T15:45:00Z",
    },
    {
      id: "3",
      sender: "Alex Johnson",
      content: [
        {
          id: "3a",
          message: "Hey there! Are you free this weekend?",
          timestamp: "2023-06-11T09:00:00Z",
          sender: "Alex Johnson",
        },
        {
          id: "3b",
          message: "I was thinking we could grab coffee.",
          timestamp: "2023-06-11T09:01:00Z",
          sender: "Alex Johnson",
        },
        {
          id: "3c",
          message: "Hi Alex! That sounds great.",
          timestamp: "2023-06-11T09:30:00Z",
          sender: "user",
        },
        {
          id: "3d",
          message: "How about Saturday afternoon?",
          timestamp: "2023-06-11T09:31:00Z",
          sender: "user",
        },
      ],
      timestamp: "2023-06-11T09:00:00Z",
    },
    {
      id: "4",
      sender: "Jake Ken",
      content: [],
      timestamp: "2023-06-11T09:00:00Z",
    },
  ];
  const notifications: Notification[] = [
    {
      id: "1",
      type: "like",
      content: "John Doe liked your post",
      timestamp: "2023-06-10T11:00:00Z",
    },
    {
      id: "2",
      type: "comment",
      content: "Jane Smith commented on your photo",
      timestamp: "2023-06-09T16:30:00Z",
    },
  ];

  useEffect(() => {}, [messages]);

  const filteredData =
    activeTab === "messages"
      ? messages.filter(
          (m) =>
            m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.content.some((c) =>
              c.message.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      : notifications.filter((n) =>
          n.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-200"
      onPress={() => handleMessageClick(item)}
      aria-label={`Open chat with ${item.sender}`}
    >
      <TouchableOpacity>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          className="w-12 h-12 rounded-full mr-4"
        />
      </TouchableOpacity>
      <View className="flex-1">
        <Text
          className="text-lg font-semibold"
          style={{
            color: Colors[colorScheme ?? "light"].text,
          }}
        >
          {item.sender}
        </Text>
        <Text className="text-gray-600" numberOfLines={1}>
          {item.content.length > 0
            ? item.content[item.content.length - 1].message
            : `Say Hi to ${item.sender}`}
        </Text>
      </View>
      <Text className="text-xs text-gray-400">
        {new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          day: "numeric",
          month: "short",
        })}
      </Text>
      <TouchableOpacity className="ml-2 opacity-30">
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color={Colors[colorScheme ?? "light"].icon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
      <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-4">
        <Ionicons
          name={
            item.type === "like"
              ? "heart"
              : item.type === "comment"
              ? "chatbubble"
              : "person-add"
          }
          size={24}
          color={Colors[colorScheme ?? "light"].primary}
        />
      </View>
      <View className="flex-1">
        <Text className="text-gray-800">{item.content}</Text>
        <Text className="text-xs text-gray-400">
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      className={`flex-1 `}
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 py-4 ${
            activeTab === "messages" ? "border-b-2 border-blue-500" : ""
          }`}
          onPress={() => setActiveTab("messages")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "messages" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-4 ${
            activeTab === "notifications" ? "border-b-2 border-blue-500" : ""
          }`}
          onPress={() => setActiveTab("notifications")}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === "notifications" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            Notifications
          </Text>
        </TouchableOpacity>
      </View>
      <View className="p-4">
        <TextInput
          className="bg-gray-100 p-2 rounded-full"
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {activeTab === "messages" ? (
        <FlatList
          data={filteredData as Message[]}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No results found
            </Text>
          }
        />
      ) : (
        <FlatList
          data={filteredData as Notification[]}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No results found
            </Text>
          }
        />
      )}

      {openMessageModal && <MessageModal />}
    </View>
  );
};
export default MessagesPage;
