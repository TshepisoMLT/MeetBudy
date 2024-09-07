/**
 * Renders a post with comments in the UI.
 *
 * @param post - The post object containing the post data.
 * @param onImageLoad - A callback function to be called when the post image is loaded.
 * @returns The rendered CommentPost component.
 */

import { Image, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";

// CommentPost component for rendering a post with comments
export const CommentPost = ({ post, onImageLoad }: { post: Post; onImageLoad: ()=>void }) => {

  // Get the current color scheme (light/dark mode)
  const colorScheme = useColorScheme();

  // State for managing like status and count
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  // Handle like/unlike action
  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  }, [liked, likeCount]);

  return (

    // Main container for the post
    <View
      className="flex flex-row border-b px-4 py-3 border-slate-600/20"
      style={{
        minHeight: 350,
      }}
    >

      {/* User avatar section */}
      <View className="w-14 items-center h-14">
        <TouchableOpacity>
          <Image
            source={{ uri: post?.avatar }}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
        </TouchableOpacity>
      </View>

      {/* Post content section */}
      <View className="flex-1 ml-2 flex-col">

        {/* User info and options */}
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text
              className="font-bold text-lg"
              style={{ color: Colors[colorScheme ?? "light"].text }}
            >
              {post?.name}
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={{ color: Colors[colorScheme ?? "light"].textSecondary }}
            >
              {post?.postedTime}
            </Text>
          </View>

          {/* Options button */}
          <TouchableOpacity className="p-2">
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
        </View>

        {/* Post caption and image */}
        <View className="space-y-3 flex-1">
          <Text
            className="text-lg font-semibold"
            style={{ color: Colors[colorScheme ?? "light"].text }}
          >
            {post?.caption}
          </Text>

          {/* Post image */}
          <TouchableOpacity className="flex-1" activeOpacity={0.9}>
            <Image
              source={{ uri: post?.image }}
              className="w-full h-56 rounded-lg"
              onLoad={onImageLoad}
            />
          </TouchableOpacity>
        </View>

        {/* Post interactions (like, comment, share) */}
        <View className="flex-row justify-between mt-3">

          {/* Like button */}
          <TouchableOpacity
            className="flex flex-row items-center space-x-1"
            onPress={handleLike}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "#e74c3c" : Colors[colorScheme ?? "light"].text}
            />
            <Text
              className="font-semibold"
              style={{ color: Colors[colorScheme ?? "light"].text }}
            >
              {likeCount}
            </Text>
          </TouchableOpacity>

          {/* Comment button */}
          <TouchableOpacity className="flex-row items-center space-x-2">
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              {post?.comments}
            </Text>
          </TouchableOpacity>
          
          {/* Share button */}
          <TouchableOpacity className="flex-row items-center space-x-2">
            <Ionicons
              name="arrow-redo-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              {post?.shares}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
