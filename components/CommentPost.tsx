import { Image, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Comment, Post } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";

export const CommentPost = ({ post, onImageLoad }: { post: Post; onImageLoad: ()=>void }) => {
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
    <View
      className="flex flex-row border-b px-4 py-3 border-slate-600/20"
      style={{
        minHeight: 350,
      }}
    >
      <View className="w-14 items-center h-14">
        <TouchableOpacity>
          <Image
            source={{ uri: post?.avatar }}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 ml-2 flex-col">
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
          <TouchableOpacity className="p-2">
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
        </View>
        <View className="space-y-3 flex-1">
          <Text
            className="text-lg font-semibold"
            style={{ color: Colors[colorScheme ?? "light"].text }}
          >
            {post?.caption}
          </Text>
          <TouchableOpacity className="flex-1" activeOpacity={0.9}>
            <Image
              source={{ uri: post?.image }}
              className="w-full h-56 rounded-lg"
              onLoad={onImageLoad}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mt-3">
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