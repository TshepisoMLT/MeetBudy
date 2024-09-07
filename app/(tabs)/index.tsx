import {
  Text,
  View,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useState, useCallback } from "react";
import StoryModal from "@/components/StoryModal";
import { StoriesComponent } from "@/components/StoriesContainer";
import { PostComponent } from "@/components/PostComponent";
import { posts } from "@/utils/Posts";
import CommentsModal from "@/components/CommentsModal";
import { Post, Story } from "@/constants/Types";

// Function to calculate the layout for each item in the FlatList
const ItemLayout = (data: any, index: number) => {
  // Destructure height and width from the data array at the given index
  const { height, width } = data[index];

  // Return an object with layout information:
  // - length: height of the item
  // - offset: vertical position of the item (height multiplied by index)
  // - index: position of the item in the list
  return { length: height, offset: index * height, index };
};



export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [openStory, setOpenStory] = useState<Story | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const toggleStoryModal = (story: Story | null) => {
    setIsStoryModalOpen(!isStoryModalOpen);
    if (openStory) {
      setOpenStory(null);
      return;
    }
    setOpenStory(story);
  };

  const toggleCommentModal = useCallback(
    (post: Post | null) => {
      setIsCommentModalOpen(!isCommentModalOpen);
      if (isCommentModalOpen) {
        setPost(null);
        return;
      }
      setPost(post);
    },
    [isCommentModalOpen]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
        ListHeaderComponent={() => (
          <StoriesComponent toggleStoryModal={toggleStoryModal} />
        )}
        data={posts}
        renderItem={({ item }) => (
          <PostComponent item={item} toggleCommentModal={toggleCommentModal} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
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
