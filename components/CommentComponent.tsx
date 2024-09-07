import { memo } from "react";
import { Image, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Comment } from "@/constants/Types";

export const CommentComponent = memo(
  ({ item }: { item: Comment }) => {
    const colorScheme = useColorScheme();
    return (
      <View className="flex flex-row border-b border-slate-600/20 p-4">
        <Image
          source={{ uri: item.user.avatar }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <View className="flex flex-row items-center mb-1">
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].text,
              }}
              className="text-base font-bold mr-2"
            >
              {item.user.name}
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={{
                color: Colors[colorScheme ?? "light"].textSecondary,
              }}
            >
              @{item.user.name.toLowerCase().replace(/\s/g, '')} · {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
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
