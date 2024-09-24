/**
 * The main component for the Home screen, which displays a feed of posts and stories.
 * It uses the SWR library to fetch and manage the posts data, and provides functionality
 * to open modals for viewing stories and comments.
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
  ToastAndroid,
} from "react-native";
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
import UploadStoryModal from "@/components/UploadModal";
import { useUploadStore } from "@/stores/UploadStore";
import UploadPostModal from "@/components/uploadPostModal";
import UploadStatusModal from "@/components/UploadStoryModal";
import React from "react";

// Function to calculate the layout for each item in the FlatList
const ItemLayout = (data: any, index: number) => ({
  length: data[index].height,
  offset: index * data[index].height,
  index,
});

// Interface for the response from the posts API
interface PostResponse {
  message: string;
  status: number;
  posts?: Post[];
  cause?: Error | any;
  name?: string;
  request?: any;
  response?: any;
  stack?: string;
  isError: boolean;
}

// Fetcher function for SWR
const fetcher = async (): Promise<PostResponse> => {
  try {
    // Fetch posts from the API
    const data = await getPosts("http://192.168.40.112:8000/api/v1/posts");
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof NetworkError) {
      return {
        message: "Network error. Please check your connection and try again.",
        status: 0,
        isError: true,
      };
    } else {
      // Handle other unexpected errors
      return {
        message: "An unexpected error occurred. Please try again later.",
        status: 0,
        isError: true,
      };
    }
  }
};

// Optimized PostItem component
const PostItem = React.memo(
  ({
    item,
    toggleCommentModal,
  }: {
    item: Post;
    toggleCommentModal: (post: Post | null) => void;
  }) => <PostComponent item={item} toggleCommentModal={toggleCommentModal} />
);

// Main component for the Home screen
export default function HomeScreen() {
  // Get the current color scheme
  const { MB_Preferred_Theme } = useHomeStore();

  // Extract story-related state and functions from the story store
  const { isStoryModalOpen, setIsStoryModalOpen, openStory, setOpenStory } =
    useStoryStore();

  // Extract comment-related state and functions from the comment store
  const { isCommentModalOpen, setIsCommentModalOpen, post, setPost } =
    useCommentStore();

  // Extract data refreshing function from the home store
  const { setDataRefreshing } = useHomeStore();

  // Extract upload-related state from the upload store
  const { isUploadModalOpen, isPostingPost, isPostingStory } = useUploadStore();

  // Function to show a toast message
  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  // Use SWR hook to fetch and manage posts data
  const {
    data: response,
    isValidating,
    mutate,
    error,
    isLoading,
  } = useSWR("/api/v1/posts", fetcher, {
    revalidateOnReconnect: false,
    shouldRetryOnError: true,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error) {
        console.error("Error fetching posts:", error);
      }
      if (config.isOnline() && retryCount < 5) {
        setTimeout(() => {
          revalidate({ retryCount });
          retryCount++;
        }, 5000);
      }
    },
    keepPreviousData: true,
    refreshWhenOffline: false,
    refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    dedupingInterval: 5 * 60 * 1000, // Dedupe requests within 5 minutes
    onSuccess: () => {
      setDataRefreshing(false);
    },
  });

  // Destructure the response data
  const { posts, message, isError } = response || {};

  // Function to toggle the story modal
  const toggleStoryModal = useCallback(
    (story: Story | null) => {
      setIsStoryModalOpen(!isStoryModalOpen);
      setOpenStory(isStoryModalOpen ? null : story);
    },
    [isStoryModalOpen, setIsStoryModalOpen, setOpenStory]
  );

  // Function to toggle the comment modal
  const toggleCommentModal = useCallback(
    (post: Post | null) => {
      setIsCommentModalOpen(!isCommentModalOpen);
      setPost(isCommentModalOpen ? null : post);
    },
    [isCommentModalOpen, setIsCommentModalOpen, setPost]
  );

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  // Function to render each post item
  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostItem item={item} toggleCommentModal={toggleCommentModal} />
    ),
    [toggleCommentModal]
  );

  // Memoized header component for the FlatList
  const ListHeaderComponent = useMemo(
    () => <StoriesComponent toggleStoryModal={toggleStoryModal} />,
    [toggleStoryModal]
  );

  // Effect to update data refreshing state
  useEffect(() => {
    setDataRefreshing(isValidating);
  }, [isValidating, setDataRefreshing]);

  // Render loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          size="large"
          color={Colors[MB_Preferred_Theme ?? "light"].tint}
        />
      </View>
    );
  }

  // Render error state
  if (isError || error) {
    showToast(message || "Error, please try again later");
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
        }}
        className="flex-1 justify-center items-center"
      >
        <Text className="text-red-500 mb-4">
          {message || "Error, please try again later"}
        </Text>
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
              color: Colors[MB_Preferred_Theme ?? "light"].text,
            }}
            className="text-white text-lg"
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render main content
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
      }}
    >
      {/* Set status bar style based on color scheme */}
      <StatusBar
        barStyle={
          MB_Preferred_Theme === "dark" ? "light-content" : "dark-content"
        }
      />

      {/* FlatList to render posts */}
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isValidating}
            onRefresh={onRefresh}
            colors={[Colors[MB_Preferred_Theme ?? "light"].tint]}
            tintColor={Colors[MB_Preferred_Theme ?? "light"].tint}
            progressBackgroundColor={
              Colors[MB_Preferred_Theme ?? "light"].background
            }
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        // getItemLayout={ItemLayout}
        initialNumToRender={10}
        onEndReachedThreshold={2}
        onEndReached={({ distanceFromEnd }) => {
          // Add logic to fetch more posts when the end of the feed is reached
          console.log(
            "Reached end of feed. Distance from end:",
            distanceFromEnd
          );
        }}
        ListEmptyComponent={() => (
          <View>
            <Text>Loading</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Text>Loading more</Text>
          </View>
        )}
      />

      {/* Render StoryModal when isStoryModalOpen is true */}
      {isStoryModalOpen && (
        <StoryModal
          isStoryModalOpen
          toggleStoryModal={toggleStoryModal}
          openStory={openStory}
        />
      )}

      {/* Render CommentsModal when isCommentModalOpen is true */}
      {isCommentModalOpen && (
        <CommentsModal
          isCommentModalOpen
          toggleCommentModal={toggleCommentModal}
          post={post}
        />
      )}

      {/* Render UploadStoryModal when isUploadModalOpen is true */}
      {isUploadModalOpen && <UploadStoryModal />}

      {/* Render UploadPostModal when isPostingPost is true */}
      {isPostingPost && <UploadPostModal />}

      {/* Render UploadStatusModal when isPostingStory is true */}
      {isPostingStory && <UploadStatusModal />}
    </View>
  );
}
