import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import StoryModal from "@/components/StoryModal";

// Story type
type Story = {
  id: string;
  name: string;
  avatar: string;
  postedTime: number;
};

// Post type
type Post = {
  id: number;
  name: string;
  avatar: string;
  postedTime: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Users stories array
  const stories: Story[] = [
    {
      id: "1",
      name: "Alex Thompson",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "2",
      name: "Jordan Lee",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "3",
      name: "Casey Morgan",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "4",
      name: "Taylor Reed",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "5",
      name: "Sam Patel",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "6",
      name: "Riley Johnson",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "7",
      name: "Quinn Martinez",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
    {
      id: "8",
      name: "Avery Chen",
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() < 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 99) + 1}.jpg`,
      postedTime: Math.floor(Math.random() * 24),
    },
  ]; // Users posts array
  const posts: Post[] = [
    {
      id: 1,
      name: "Liam Johnson",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      image: "https://picsum.photos/seed/1/400/300",
      caption: "Just had an amazing day at the beach!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      image: "https://picsum.photos/seed/2/400/300",
      caption: "Trying out a new recipe tonight. Wish me luck!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 3,
      name: "Noah Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      image: "https://picsum.photos/seed/3/400/300",
      caption: "Just finished reading an incredible book. Highly recommend!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 4,
      name: "Olivia Patel",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      image: "https://picsum.photos/seed/4/400/300",
      caption: "Excited for my upcoming vacation!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 5,
      name: "Ethan Kim",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      image: "https://picsum.photos/seed/5/400/300",
      caption: "Just adopted a new puppy. Meet Max!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 6,
      name: "Sophia Nguyen",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      image: "https://picsum.photos/seed/6/400/300",
      caption: "Celebrating my birthday today!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 7,
      name: "Mason Garcia",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      image: "https://picsum.photos/seed/7/400/300",
      caption: "Just ran my first marathon. Feeling accomplished!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
    {
      id: 8,
      name: "Ava Thompson",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      image: "https://picsum.photos/seed/8/400/300",
      caption: "Started learning a new language today. Bonjour!",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      postedTime: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ).toISOString(),
    },
  ];

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
      <View
        className="flex-1 w-full justify-center"
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].container,
        }}
      >
        <FlatList
          ListHeaderComponent={
            <View className="w-full mt-1 px-2 pt-2">
              <View
                className=" w-full h-24"
                style={{
                  backgroundColor: Colors[colorScheme ?? "light"].container,
                }}
              >
                <FlatList
                  data={stories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View className="w-20 h-24 items-center justify-center">
                      <TouchableOpacity
                        className="w-16 h-16 items-center p-1 justify-center rounded-full"
                        style={{
                          backgroundColor: Colors[colorScheme ?? "light"].tint,
                        }}
                      >
                        <Image
                          source={{ uri: item.avatar }}
                          className="w-full h-full rounded-full"
                        />
                      </TouchableOpacity>
                      <Text
                        className="text-center font-bold"
                        style={{
                          color: Colors[colorScheme ?? "light"].text,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <View
              id="Post"
              className="mt-1"
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].background,
              }}
            >
              <View
                id="PostHeading"
                className="h-16 flex flex-row items-center pt-2 justify-between"
              >
                <View
                  id="PostHeadingRight"
                  className="flex flex-row items-center justify-center"
                >
                  <TouchableOpacity>
                    <Image
                      source={{ uri: item.avatar }}
                      className="w-14 h-14 rounded-full mx-3"
                    />
                  </TouchableOpacity>
                  <View className="flex flex-col items-start">
                    <TouchableOpacity>
                      <Text
                        className="text-center font-bold text-lg"
                        style={{
                          color: Colors[colorScheme ?? "light"].text,
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      className="text-center font-light text-xs"
                      style={{
                        color: Colors[colorScheme ?? "light"].text,
                      }}
                    >
                      {item.postedTime}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  id="PostHeadingLeft"
                  className="px-4 justify-center items-center"
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={24}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                </TouchableOpacity>
              </View>
              <View id="ImageContent" className="w-full">
                <View className="w-full p-3">
                  <Text
                    className="font-bold justify-center"
                    style={{
                      color: Colors[colorScheme ?? "light"].text,
                    }}
                  >
                    {item.caption}
                  </Text>
                </View>
                <TouchableOpacity className="w-full px-3">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-72 rounded-lg"
                  />
                </TouchableOpacity>
              </View>
              <View
                id="PostFooter"
                className="flex flex-row h-14 px-3 justify-between items-center"
              >
                <TouchableOpacity className="flex flex-row items-center h-12 px-4 space-x-2 ">
                  <Ionicons
                    name="heart-outline"
                    size={28}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text
                    className="text-center font-bold"
                    style={{
                      color: Colors[colorScheme ?? "light"].text,
                    }}
                  >
                    {item.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row items-center h-12 px-4 space-x-2 ">
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text
                    className="text-center font-bold"
                    style={{
                      color: Colors[colorScheme ?? "light"].text,
                    }}
                  >
                    {item.comments}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row items-center h-12 px-4 space-x-2 ">
                  <Ionicons
                    name="share-social-outline"
                    size={24}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text
                    className="text-center font-bold"
                    style={{
                      color: Colors[colorScheme ?? "light"].text,
                    }}
                  >
                    {item.shares}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {isModalOpen && (
        <StoryModal isModalOpen setIsModalOpen={setIsModalOpen} />
      )}
    </SafeAreaView>
  );
}
