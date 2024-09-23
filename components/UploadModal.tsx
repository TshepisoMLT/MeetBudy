/**
 * Renders the upload modal component, which provides options for creating new content such as posts, stories, live streams, and polls.
 *
 * The modal is displayed when the `isUploadModalOpen` state is true, and is closed when the user interacts with the backdrop, back button, or swipes down the modal.
 *
 * The modal content includes a title, a handle for swiping the modal down, and four options:
 * - "Write a post": Triggers the `setIsPostingPost` action and closes the modal.
 * - "Add a story": Triggers the `setIsPostingStory` action and closes the modal.
 * - "Start a live stream": Closes the modal (live stream functionality is not yet implemented).
 * - "Create a poll": Closes the modal (poll creation functionality is not yet implemented).
 *
 * The modal's appearance (colors, icons) adapts to the user's color scheme (light or dark).
 */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { useUploadStore } from "@/stores/UploadStore";
import { useHomeStore } from "@/stores/homeStore";

// Component for displaying the upload modal
export default function UploadModal() {
  // Get the current color scheme (light/dark)
  const { MB_Preferred_Theme } = useHomeStore();

  // Destructure functions and state from the upload store
  const {
    setIsUploadModalOpen,
    isUploadModalOpen,
    setIsPostingPost,
    setIsPostingStory,
  } = useUploadStore();

  // Handler for the "Write a post" option
  const handlePostOption = () => {
    setIsPostingPost(true);
    setIsUploadModalOpen(false);
  };

  // Handler for the "Add a story" option
  const handleStoryOption = () => {
    setIsPostingStory(true);
    setIsUploadModalOpen(false);
  };

  // Handler for the "Start a live stream" option
  const handleLiveStreamOption = () => {
    // TODO: Implement live stream functionality
    setIsUploadModalOpen(false);
  };

  // Handler for the "Create a poll" option
  const handlePollOption = () => {
    // TODO: Implement poll creation functionality
    setIsUploadModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar that adapts to the color scheme */}
      <StatusBar
        barStyle={
          MB_Preferred_Theme === "dark" ? "light-content" : "dark-content"
        }
      />
      {/* Modal component for the upload options */}
      <ReactNativeModal
        isVisible={isUploadModalOpen}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setIsUploadModalOpen(false)}
        onBackButtonPress={() => setIsUploadModalOpen(false)}
        swipeDirection={["down"]}
        onSwipeComplete={() => setIsUploadModalOpen(false)}
        style={styles.modal}
      >
        {/* Modal content */}
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
            },
          ]}
        >
          {/* Handle for swiping the modal down */}
          <View style={styles.handle} />
          {/* Modal title */}
          <Text
            style={[
              styles.title,
              { color: Colors[MB_Preferred_Theme ?? "light"].text },
            ]}
          >
            Create New Content
          </Text>
          {/* "Write a post" option */}
          <TouchableOpacity onPress={handlePostOption} style={styles.option}>
            <Ionicons
              name="create-outline"
              size={28}
              color={Colors[MB_Preferred_Theme ?? "light"].text}
            />
            <Text
              style={[
                styles.optionText,
                { color: Colors[MB_Preferred_Theme ?? "light"].text },
              ]}
            >
              Write a post
            </Text>
          </TouchableOpacity>
          {/* "Add a story" option */}
          <TouchableOpacity onPress={handleStoryOption} style={styles.option}>
            <Ionicons
              name="camera-outline"
              size={28}
              color={Colors[MB_Preferred_Theme ?? "light"].text}
            />
            <Text
              style={[
                styles.optionText,
                { color: Colors[MB_Preferred_Theme ?? "light"].text },
              ]}
            >
              Add a story
            </Text>
          </TouchableOpacity>
          {/* "Start a live stream" option */}
          <TouchableOpacity
            onPress={handleLiveStreamOption}
            style={styles.option}
          >
            <Ionicons
              name="videocam-outline"
              size={28}
              color={Colors[MB_Preferred_Theme ?? "light"].text}
            />
            <Text
              style={[
                styles.optionText,
                { color: Colors[MB_Preferred_Theme ?? "light"].text },
              ]}
            >
              Start a live stream
            </Text>
          </TouchableOpacity>
          {/* "Create a poll" option */}
          <TouchableOpacity onPress={handlePollOption} style={styles.option}>
            <Ionicons
              name="bar-chart-outline"
              size={28}
              color={Colors[MB_Preferred_Theme ?? "light"].text}
            />
            <Text
              style={[
                styles.optionText,
                { color: Colors[MB_Preferred_Theme ?? "light"].text },
              ]}
            >
              Create a poll
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#BDBDBD",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
  },
  optionText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "600",
  },
});
