/**
 * StoriesComponent is a React component that displays a horizontal list of user stories.
 *
 * @param toggleStoryModal - A function that is called when a story is pressed, passing the story object as a parameter.
 * @returns A React element that renders the stories list.
 */
import React, { memo } from "react";
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { getStories, NetworkError } from "@/utils/home/getStories";
import { Story } from "@/constants/Types";
import useSWR from "swr";
import { useHomeStore } from "@/stores/homeStore";
import { Ionicons } from "@expo/vector-icons";
import {useUploadStore} from "@/stores/UploadStore";

interface StoriesResponse {
  message: string;
  status: number;
  stories?: Story[];
  cause?: Error | any;
  name?: string;
  request?: any;
  response?: any;
  stack?: string;
  isError: boolean;
}

// Fetcher function for SWR
const fetcher = async (): Promise<StoriesResponse> => {
  try {
    // Attempt to fetch stories from the API
    return await getStories("http://192.168.40.112:8000/api/v1/stories");
  } catch (error) {
    // Handle network errors
    if (error instanceof NetworkError) {
      return {
        message: "Network error. Please check your connection and try again.",
        status: 0,
        isError: true,
      };
    } else {
      return {
        message: "An unexpected error occurred. Please try again later.",
        status: 0,
        isError: true,
      };
    }
  }
};

// StoriesComponent displays a horizontal list of user stories
export const StoriesComponent = memo(
  ({
    toggleStoryModal,
  }: {
    toggleStoryModal: (value: Story | null) => void;
  }) => {
    // Get the current color scheme (light or dark mode)
    const colorScheme = useColorScheme();
    const { setIsUploadModalOpen, isUploadModalOpen } =
      useUploadStore();

    // Get the dataRefreshing state from the home store
    const { dataRefreshing } = useHomeStore();

    // Use SWR hook to fetch and manage stories data
    const {
      data: response,
      mutate,
      error,
    } = useSWR("/api/v1/stories", fetcher, {
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Log errors to console
        if (error) {
          console.error("Error fetching stories:", error);
        }
        // Retry up to 5 times when online
        if (config.isOnline() && retryCount < 5) {
          setTimeout(() => revalidate({ retryCount }), 60000); // Retry every minute
        }
      },
      keepPreviousData: true,
      refreshWhenOffline: false,
      refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
      dedupingInterval: 5 * 60 * 1000, // Dedupe requests within 5 minutes
    });

    const showToast = (message: string) => {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    };

    const handleUploadClick = () => {
      setIsUploadModalOpen(!isUploadModalOpen);
    }

    const { stories, message, status, isError } = response || {};

    // Effect to trigger data refresh when dataRefreshing changes
    React.useEffect(() => {
      if (dataRefreshing) {
        mutate();
      }
    }, [dataRefreshing, mutate]);

    // Render loading state or error message if stories are not available
    if (isError || error) {
      showToast(message || "Error, please try again later");
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}
          className="flex-1 justify-center items-center"
        >
          {/* Display error message if any */}
          <Text className="text-red-500 mb-4">
            {message || "Error, please try again later"}
          </Text>
          {/* Retry button */}
          <TouchableOpacity
            onPress={() => mutate()}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].text,
              }}
              className="text-white text-lg"
            >
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Render the stories list
    return (
      <View className="py-4">
        {/* Stories header */}
        {/* <View className="w-full h-20 bg-red-500"></View> */}
        <Text
          className="text-lg font-bold mb-2 px-4"
          style={{ color: Colors[colorScheme ?? "light"].text }}
        >
          Stories
        </Text>
        {/* Horizontal scrollable list of stories */}
        <FlatList
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          ListHeaderComponent={() => (
            <TouchableOpacity
              onPress={handleUploadClick}
              className="items-center justify-center mb-1 rounded-full mr-4"
            >
              <View className="w-20 h-20 items-center justify-center mb-1">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/10.jpg",
                  }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36,
                  }}
                />
                <View
                  className="absolute bottom-1 right-0 rounded-full"
                  style={{
                    backgroundColor: Colors[colorScheme ?? "light"].tint,
                  }}
                >
                  <Ionicons name="add-outline" size={28} color="white" />
                </View>
              </View>
              <Text
                className="text-center text-xs"
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                }}
                numberOfLines={1}
              >
                Add to story
              </Text>
            </TouchableOpacity>
          )}
          renderItem={({ item }) => (
            // Touchable story item
            <TouchableOpacity
              onPress={() => toggleStoryModal(item)}
              className="mr-4 items-center"
            >
              {/* Story avatar container */}
              <View
                className="w-20 h-20 items-center justify-center mb-1"
                style={{
                  borderRadius: 40,
                  borderWidth: 2,
                  borderColor: Colors[colorScheme ?? "light"].tint,
                }}
              >
                {/* Story avatar image */}
                <Image
                  source={{ uri: item.avatar }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36,
                    borderWidth: 3,
                    borderColor: Colors[colorScheme ?? "light"].background,
                  }}
                />
              </View>
              {/* Story user name */}
              <Text
                className="text-center text-xs"
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
);
