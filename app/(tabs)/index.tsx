/**
 * The main component for the Home screen, which displays a feed of posts and stories.
 * It manages the state of various modals (story modal, comment modal) and the refresh status.
 * The component uses a FlatList to render the posts and a custom ItemLayout function to optimize the layout.
 * It also includes a StoriesComponent at the top of the feed and handles the toggling of the story and comment modals.
 */

import {
  View,
  StatusBar,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useMemo } from "react";
import StoryModal from "@/components/StoryModal";
import { StoriesComponent } from "@/components/StoriesContainer";
import { PostComponent } from "@/components/PostComponent";
import CommentsModal from "@/components/CommentsModal";
import { Post, Story } from "@/constants/Types";
import { useStoryStore } from "@/stores/storyStore";
import { useCommentStore } from "@/stores/commentStore";
import useSWR from "swr";
import { getPosts } from "@/utils/home/getPosts";
import { NetworkError } from "@/utils/home/getPosts";
import { useHomeStore } from "@/stores/homeStore";

// Function to calculate the layout for each item in the FlatList
const ItemLayout = (data: any, index: number) => ({
  length: data[index].height,
  offset: index * data[index].height,
  index,
});

// Fetcher function for SWR
const fetcher = async () => {
  try {
    return await getPosts("http://192.168.41.164:8000/api/v1/posts");
  } catch (error) {
    if (error instanceof NetworkError) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
};

// Main component for the Home screen
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { isStoryModalOpen, setIsStoryModalOpen, openStory, setOpenStory } =
    useStoryStore();
  const { isCommentModalOpen, setIsCommentModalOpen, post, setPost } =
    useCommentStore();
  const { setDataRefreshing } = useHomeStore();

  const {
    data: posts,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/v1/posts", fetcher, {
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error) {
        console.error("uyfuyy", error);
      }
      console.log("is online:", config.isOnline());
      if (config.isOnline()) {
        revalidate({ 
          retryCount: 5,
         });
      } else {
        return;
      }
    },
    keepPreviousData: true,
    isOnline() {
      return navigator.onLine;
    },
    refreshWhenOffline: false,
    refreshInterval: 5 * 60 * 1000,
  });

  const toggleStoryModal = useCallback(
    (story: Story | null) => {
      setIsStoryModalOpen(!isStoryModalOpen);
      setOpenStory(isStoryModalOpen ? null : story);
    },
    [isStoryModalOpen, setIsStoryModalOpen, setOpenStory]
  );

  const toggleCommentModal = useCallback(
    (post: Post | null) => {
      setIsCommentModalOpen(!isCommentModalOpen);
      setPost(isCommentModalOpen ? null : post);
    },
    [isCommentModalOpen, setIsCommentModalOpen, setPost]
  );

  const onRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostComponent item={item} toggleCommentModal={toggleCommentModal} />
    ),
    [toggleCommentModal]
  );

  const ListHeaderComponent = useMemo(
    () => <StoriesComponent toggleStoryModal={toggleStoryModal} />,
    [toggleStoryModal]
  );

  useEffect(() => {
    isValidating ? setDataRefreshing(true) : setDataRefreshing(false);
  }, [isValidating]);

  if (!posts) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
        className="flex-1 justify-center items-center"
      >
        <Text className="text-red-500 mb-4">{error?.message}</Text>
        <Image
          source={{
            uri: "https://ouch-cdn2.icons8.com/uORZYvKIb8zcJIkQLEFsDguz7YjYruZWslRmb3bwWGs/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzkz/LzMwZDliN2ZhLThi/N2MtNDBhOS1hN2Y2/LTBlODBmZGFlYzk2/ZC5zdmc.png",
          }}
          className="h-96 w-96"
        />
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

  if (!posts) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].tint}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isValidating}
            onRefresh={onRefresh}
            colors={[Colors[colorScheme ?? "light"].tint]}
            tintColor={Colors[colorScheme ?? "light"].tint}
            progressBackgroundColor={Colors[colorScheme ?? "light"].background}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        getItemLayout={ItemLayout}
        initialNumToRender={10}
        onEndReachedThreshold={0.8}
        onEndReached={({ distanceFromEnd }) => {
          // Add logic to fetch more posts when the end of the feed is reached
          console.log(
            "Reached end of feed. Distance from end:",
            distanceFromEnd
          );
        }}
      />

      {isStoryModalOpen && (
        <StoryModal
          isStoryModalOpen
          toggleStoryModal={toggleStoryModal}
          openStory={openStory}
        />
      )}

      {isCommentModalOpen && (
        <CommentsModal
          isCommentModalOpen
          toggleCommentModal={toggleCommentModal}
          post={post}
        />
      )}
    </View>
  );
}
