/**
 * Renders a single post component with user information, post content, and interaction buttons.
 *
 * @param {PostComponentProps} props - The props for the PostComponent.
 * @param {Post} props.item - The post data to be displayed.
 * @param {(item: Post | null) => void} props.toggleCommentModal - A function to toggle the comment modal for the post.
 * @returns {React.ReactElement} - The rendered PostComponent.
 */
import React, { memo, useCallback, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Share,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "@/constants/Types";
import { useHomeStore } from "@/stores/homeStore";

// Define the props for the PostComponent component
type PostComponentProps = {
  item: Post;
  toggleCommentModal: (item: Post | null) => void;
};

// PostComponent: Renders a single post
export const PostComponent = memo(
  ({ item, toggleCommentModal }: PostComponentProps) => {
    // Get the current color scheme (light/dark)
    const { MB_Preferred_Theme } = useHomeStore();

    // State for managing like status and count
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes);
    const [commentCount, setCommentCount] = useState(item.commentList.length);
    const [shareCount, setShareCount] = useState(item.shares);
    const [isShared, setIsShared] = useState(false);

    // State for managing image loading status
    const [imageLoaded, setImageLoaded] = useState(false);

    // Animation value for fading in the image
    const fadeAnim = useState(new Animated.Value(0))[0];

    // Handle like/unlike action
    const handleLike = useCallback(() => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }, [liked, likeCount]);

    // Handle image load completion
    const onImageLoad = () => {
      setImageLoaded(true);
      // Start fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    // Function to handle sharing the post
    const handleShare = async () => {
      try {
        // Attempt to share the post using the Share API
        const shared = await Share.share({
          // Construct the message based on the platform
          message: `${
            Platform.OS === "android"
              ? // For Android, include the post image URL in the message
                `Check out this post from ${item?.name}!, ${item?.caption}, ${item.image} `
              : // For iOS, only include the post name
                `Check out this post from ${item?.name}!, ${item.caption}
          `
          }`,
          // Set the URL to the post image
          url: item?.image,
          // Set the title for the share dialog
          title: "Share Post",
        });

        if (!isShared && shared.action === Share.sharedAction) {
          // Set the shared state to true if sharing is successful
          setIsShared(true);
          setShareCount(shareCount + 1);
          // Log a success message if sharing is successful
          console.log("Post shared successfully!");
        }
      } catch (error) {
        // Log any errors that occur during sharing
        console.error("Error sharing post:", error);
      }
    };

    return (
      <View
        className="overflow-hidden border-t border-slate-600/20"
        style={{
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
        }}
      >
        {/* Post header: User info and options */}
        <View className="flex flex-row items-center p-3 justify-between">
          <View className="flex flex-row items-center">
            {/* User avatar */}
            <TouchableOpacity>
              <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full"
              />
            </TouchableOpacity>
            {/* User name and post time */}
            <View className="ml-3">
              <TouchableOpacity>
                <Text
                  className="font-bold text-base"
                  style={{ color: Colors[MB_Preferred_Theme ?? "light"].text }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
              <Text
                className="text-xs"
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].textSecondary,
                }}
              >
                {new Date(item.postedTime).toLocaleString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Text>
            </View>
          </View>
          {/* Post options button */}
          <TouchableOpacity className="p-2 opacity-50">
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={Colors[MB_Preferred_Theme ?? "light"].text}
            />
          </TouchableOpacity>
        </View>

        {/* Post caption */}
        <View className="px-3 pb-3">
          <Text
            className="text-base"
            style={{ color: Colors[MB_Preferred_Theme ?? "light"].text }}
          >
            {item.caption}
          </Text>
        </View>

        {/* Post image */}
        <TouchableOpacity
          onPress={() => toggleCommentModal(item)}
          className="relative px-3"
        >
          {/* Animated image with fade-in effect */}
          <Animated.Image
            source={{ uri: item.image }}
            className="w-full h-80 rounded-lg"
            style={{ opacity: fadeAnim }}
            onLoad={onImageLoad}
          />
          {/* Show placeholder while image is loading */}
          {!imageLoaded && (
            <View className="absolute w-full h-80 rounded-lg inset-0 flex items-center justify-center">
              <Ionicons
                name="image-outline"
                size={48}
                color={Colors[MB_Preferred_Theme ?? "light"].textSecondary}
              />
            </View>
          )}
        </TouchableOpacity>

        {/* Post actions: Like, Comment, Share */}
        <View className="flex flex-row justify-between items-center py-3 px-6">
          {/* Like button */}
          <TouchableOpacity
            className="flex flex-row items-center space-x-1"
            onPress={handleLike}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={
                liked ? "#e74c3c" : Colors[MB_Preferred_Theme ?? "light"].text
              }
            />
            <Text
              className="font-semibold"
              style={{ color: Colors[MB_Preferred_Theme ?? "light"].text }}
            >
              {likeCount}
            </Text>
          </TouchableOpacity>

          {/* Comment button */}
          <TouchableOpacity
            onPress={() => toggleCommentModal(item)}
            className="flex flex-row items-center space-x-1"
          >
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={Colors[MB_Preferred_Theme ?? "light"].text}
            />
            <Text
              className="font-semibold"
              style={{ color: Colors[MB_Preferred_Theme ?? "light"].text }}
            >
              {commentCount}
            </Text>
          </TouchableOpacity>

          {/* Bookmark button */}
          <TouchableOpacity
            // onPress={handleShare}
            className="flex flex-row items-center space-x-1"
          >
            <Ionicons
              name={isShared ? "bookmark" : "bookmark-outline"}
              size={22}
              color={
                isShared
                  ? Colors[MB_Preferred_Theme ?? "light"].tint
                  : Colors[MB_Preferred_Theme ?? "light"].text
              }
            />
          </TouchableOpacity>

          {/* Share button */}
          <TouchableOpacity
            onPress={handleShare}
            className="flex flex-row items-center space-x-1"
          >
            <Ionicons
              name={isShared ? "arrow-redo" : "arrow-redo-outline"}
              size={22}
              color={
                isShared
                  ? Colors[MB_Preferred_Theme ?? "light"].tint
                  : Colors[MB_Preferred_Theme ?? "light"].text
              }
            />
            <Text
              className="font-semibold"
              style={{ color: Colors[MB_Preferred_Theme ?? "light"].text }}
            >
              {shareCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  // Memoization comparison function
  (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
  }
);
