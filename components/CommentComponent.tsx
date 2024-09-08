/**
 * Renders a single comment with user avatar, name, and timestamp.
 *
 * @param item - The comment object to be rendered.
 * @param item.user - The user object associated with the comment.
 * @param item.user.avatar - The URL of the user's avatar image.
 * @param item.user.name - The name of the user who made the comment.
 * @param item.timestamp - The timestamp of when the comment was made.
 * @param item.comment - The text content of the comment.
 * @returns A React component that renders the comment.
 */

import { memo } from "react";
import { Image, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Comment } from "@/constants/Types";

// CommentComponent: Renders a single comment with user avatar, name, and timestamp
export const CommentComponent = memo(
  ({ item }: { item: Comment }) => {
    const colorScheme = useColorScheme();
    return (
      // Container for the entire comment
      <View className="flex flex-row border-b border-slate-600/20 p-4">
        {/* User avatar */}
        <Image
          source={{ uri: item.user.avatar }}
          className="w-12 h-12 rounded-full mr-3"
        />

        {/* Comment content container */}
        <View className="flex-1">
          {/* User info and timestamp */}
          <View className="flex flex-row items-center mb-1">
            {/* User name */}
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].text,
              }}
              className="text-base font-bold mr-2"
            >
              {item.user.name}
            </Text>

            {/* Username and timestamp */}
            <Text
              className="text-sm text-gray-500"
              style={{
                color: Colors[colorScheme ?? "light"].textSecondary,
              }}
            >
              @{item.user.name.toLowerCase().replace(/\s/g, "")} ·{" "}
              {new Date(item.timestamp).toLocaleString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </View>

          {/* Comment text */}
          <Text
            className="text-base"
            style={{
              color: Colors[colorScheme ?? "light"].text,
            }}
          >
            {item.comment}
          </Text>
        </View>
      </View>
    );
  }
);
