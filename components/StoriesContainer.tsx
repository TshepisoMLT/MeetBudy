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
import { stories } from "@/utils/Stories";
import { Story } from "@/constants/Types";

// StoriesComponent displays a horizontal list of user stories
export const StoriesComponent = memo(({
  toggleStoryModal,
}: {
  toggleStoryModal: (value: Story | null) => void;
}) => {
  // Get the current color scheme (light or dark mode)
  const colorScheme = useColorScheme();

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
