/**
 * The `StoryModal` component is responsible for rendering a modal that displays a story, including the story image, user information, and interactive elements such as reaction emojis and a reply input.
 *
 * The component receives the following props:
 * - `isStoryModalOpen`: a boolean indicating whether the story modal should be displayed
 * - `toggleStoryModal`: a function that toggles the visibility of the story modal
 * - `openStory`: an object of type `Story` that contains the details of the story to be displayed
 *
 * The component uses various React Native components and hooks to implement the functionality, including `ReactNativeModal`, `Animated`, and `useMB_Preferred_Theme`. It also uses the `useEffect` hook to prefetch the story image and manage the image loading state.
 *
 * The component renders the story modal with the user's avatar, name, and post date, as well as the story image (with an optional text overlay) and interactive elements such as reaction emojis and a reply input. The component also handles the sharing of the story using the `Share` API.
 */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Share,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Story } from "@/constants/Types";
import { useHomeStore } from "@/stores/homeStore";

// Define the props for the StoryModal component
type StoryModalProps = {
  isStoryModalOpen: boolean;
  toggleStoryModal: (story: Story | null) => void;
  openStory: Story | null;
};

export default function StoryModal({
  isStoryModalOpen,
  toggleStoryModal,
  openStory,
}: StoryModalProps) {
  // Get the current color scheme (light or dark)
  const { MB_Preferred_Theme } = useHomeStore();
  // State to track if the image has loaded
  const [imageLoaded, setImageLoaded] = useState(false);
  // State to store the reply text
  const [replyText, setReplyText] = useState("");
  // Shared value for animation scale
  const scale = useSharedValue(1);

  // Effect to prefetch the story image when a story is opened
  useEffect(() => {
    if (openStory) {
      // Prefetch the image to improve loading performance
      Image.prefetch(openStory.storyImage)
        .then(() => setImageLoaded(true))
        .catch((error) => console.error("Error prefetching image:", error));
    }
    // Clean up function to reset image loaded state
    return () => {
      setImageLoaded(false);
    };
  }, [openStory]);

  // Create an animated style for scaling the image
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Function to handle sharing the story
  const handleShare = async () => {
    try {
      // Attempt to share the story using the Share API
      await Share.share({
        // Construct the message based on the platform
        message: `${
          Platform.OS === "android"
            ? // For Android, include the story image URL in the message
              `Check out this story from ${openStory?.name}!, ${openStory?.storyImage} `
            : // For iOS, only include the story name
              `Check out this story from ${openStory?.name}!
        `
        }`,
        // Set the URL to the story image
        url: openStory?.storyImage,
        // Set the title for the share dialog
        title: "Share Story",
      });
    } catch (error) {
      // Log any errors that occur during sharing
      console.error("Error sharing story:", error);
    }
  };

  // Array of reaction emojis
  const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
      }}
    >
      {/* Modal component for displaying the story */}
      <ReactNativeModal
        isVisible={isStoryModalOpen}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => toggleStoryModal(null)}
        onBackButtonPress={() => toggleStoryModal(null)}
        swipeDirection={["down"]}
        onSwipeComplete={() => toggleStoryModal(null)}
        style={{
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
          flex: 1,
          margin: 0,
          padding: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
          }}
        >
          {/* Header section with user info and controls */}
          <View className="p-2 items-center flex flex-row bg-slate-500/30 absolute top-0 left-0 right-0 z-10">
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* User avatar */}
              <TouchableOpacity onPress={() => toggleStoryModal(null)}>
                <Image
                  source={{ uri: openStory?.avatar }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                />
              </TouchableOpacity>
              {/* User name and post date */}
              <View>
                <Text
                  style={{
                    color: Colors[MB_Preferred_Theme ?? "light"].text,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {openStory?.name}
                </Text>
                <Text
                  style={{
                    color: Colors[MB_Preferred_Theme ?? "light"].text,
                    fontSize: 12,
                  }}
                >
                  {openStory &&
                    new Date(openStory.postedTime).toLocaleString(undefined, {
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
            {/* Share button */}
            <TouchableOpacity onPress={handleShare} className="mr-8 ml-auto">
              <Ionicons
                name="arrow-redo-outline"
                size={24}
                color={Colors[MB_Preferred_Theme ?? "light"].text}
              />
            </TouchableOpacity>
            {/* Close button */}
            <TouchableOpacity
              className="mr-2"
              onPress={() => toggleStoryModal(null)}
            >
              <Ionicons
                name="chevron-down"
                size={24}
                color={Colors[MB_Preferred_Theme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>
          {/* Main content area for the story image */}
          <View style={{ flex: 1 }}>
            {imageLoaded ? (
              // Display the story image when loaded
              <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                <Image
                  source={{ uri: openStory?.storyImage }}
                  resizeMode="cover"
                  style={{ flex: 1 }}
                />
                {/* Text overlay for the story */}
                {openStory?.textOverlay && (
                  <View
                    className="absolute bottom-32 left-5 right-5 bg-black/60 "
                    style={{
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{ color: "white", fontSize: 16 }}
                      className="text-center"
                    >
                      {openStory.textOverlay}
                    </Text>
                  </View>
                )}
              </Animated.View>
            ) : (
              // Loading indicator while the image is being loaded
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="large"
                  color={Colors[MB_Preferred_Theme ?? "light"].text}
                />
              </View>
            )}
          </View>
          {/* Reaction emojis section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
            }}
            className="p-2 pb-3 items-center flex flex-row  absolute bottom-16 left-0 right-0"
          >
            {reactionEmojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => console.log(`Reacted with ${emoji}`)}
              >
                <Text style={{ fontSize: 24 }}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Reply input section */}
          <View
            style={{
              flexDirection: "row",
              padding: 10,
            }}
            className="p-2 items-center flex flex-row  absolute bottom-0 left-0 right-0"
          >
            {/* Text input for reply */}
            <TextInput
              style={{
                flex: 1,
                borderColor: Colors[MB_Preferred_Theme ?? "light"].text,
                borderWidth: 1,
                borderRadius: 20,
                padding: 10,
                color: Colors[MB_Preferred_Theme ?? "light"].text,
              }}
              className="bg-slate-500/30"
              placeholder="Reply to story..."
              placeholderTextColor={Colors[MB_Preferred_Theme ?? "light"].text}
              value={replyText}
              onChangeText={setReplyText}
            />
            {/* Send button for the reply */}
            <TouchableOpacity
              style={{ marginLeft: 10, justifyContent: "center" }}
              onPress={() => {
                console.log("Reply sent:", replyText);
                setReplyText("");
              }}
            >
              <Ionicons
                name="send"
                size={24}
                color={Colors[MB_Preferred_Theme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
}
