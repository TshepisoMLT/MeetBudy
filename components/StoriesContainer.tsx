/**
 * StoriesComponent is a React component that displays a horizontal list of user stories.
 *
 * @param toggleStoryModal - A function that is called when a story is pressed, passing the story object as a parameter.
 * @returns A React element that renders the stories list.
 */
import React, { memo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { getStories, NetworkError } from "@/utils/home/getStories";
import { Story } from "@/constants/Types";
import useSWR from "swr";
import { useHomeStore } from "@/stores/homeStore";

// Fetcher function for SWR
const fetcher = async () => {
  try {
    // Attempt to fetch stories from the API
    return await getStories("http://192.168.41.164:8000/api/v1/stories");
  } catch (error) {
    // Handle network errors
    if (error instanceof NetworkError) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    } else {
      // Handle other unexpected errors
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
};

// StoriesComponent displays a horizontal list of user stories
export const StoriesComponent = memo(({
  toggleStoryModal,
}: {
  toggleStoryModal: (value: Story | null) => void;
}) => {
  // Get the current color scheme (light or dark mode)
  const colorScheme = useColorScheme();

  // Get the dataRefreshing state from the home store
  const { dataRefreshing } = useHomeStore();

  // Use SWR hook to fetch and manage stories data
  const {
    data: stories,
    error,
    mutate,
  } = useSWR("/api/v1/stories", fetcher, {
    revalidateOnReconnect: false,
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

  // Effect to trigger data refresh when dataRefreshing changes
  React.useEffect(() => {
    if (dataRefreshing) {
      mutate();
    }
  }, [dataRefreshing, mutate]);

  // Render loading state or error message if stories are not available
  if (!stories) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
        className="flex-1 justify-center items-center"
      >
        {/* Display error message if any */}
        <Text className="text-red-500 mb-4">{error?.message}</Text>
        {/* Display error image */}
        <Image
          source={{
            uri: "https://ouch-cdn2.icons8.com/uORZYvKIb8zcJIkQLEFsDguz7YjYruZWslRmb3bwWGs/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzkz/LzMwZDliN2ZhLThi/N2MtNDBhOS1hN2Y2/LTBlODBmZGFlYzk2/ZC5zdmc.png",
          }}
          className="h-96 w-96"
        />
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
});
