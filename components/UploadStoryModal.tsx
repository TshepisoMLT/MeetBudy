/**
 * UploadStoryModal is a React component that renders a modal for uploading a new story.
 * It allows the user to enter a story text, select an image, set the story duration, and add a location.
 * The component uses the `useUploadStore` hook to manage the state of the upload process.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { useUploadStore } from "@/stores/UploadStore";
import * as ImagePicker from "expo-image-picker";
import { useHomeStore } from "@/stores/homeStore";

export default function UploadStoryModal() {
  // Get the current color scheme (light/dark mode)
  const { MB_Preferred_Theme } = useHomeStore();

  // Destructure values and functions from the upload store
  const {
    setIsUploadModalOpen,
    isUploadModalOpen,
    isPostingStory,
    setIsPostingStory,
  } = useUploadStore();

  // State variables for story details
  const [storyText, setStoryText] = useState("");
  const [duration, setDuration] = useState(24); // Default duration in hours
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [location, setLocation] = useState("");

  // Function to handle story upload
  const handleUploadStory = () => {
    console.log("Uploading story:", {
      text: storyText,
      image: selectedImage,
      duration,
    });
    setIsPostingStory(false);
  };

  // Function to handle image selection
  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  // Function to handle duration change
  const handleDurationChange = (hours: number) => {
    setDuration(hours);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Modal component for story upload */}
      <ReactNativeModal
        isVisible={isPostingStory}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setIsPostingStory(false)}
        onBackButtonPress={() => setIsPostingStory(false)}
        swipeDirection={["down"]}
        onSwipeComplete={() => setIsPostingStory(false)}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        {/* Scrollable content of the modal */}
        <ScrollView
          style={{
            backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
            maxHeight: "100%",
          }}
        >
          <View style={{ padding: 20 }}>
            {/* Modal handle bar */}
            <View className="bg-gray-300 h-1 w-16 rounded-full self-center mb-4" />

            {/* Modal title */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 16,
                color: Colors[MB_Preferred_Theme ?? "light"].text,
                textAlign: "center",
              }}
            >
              Create New Story
            </Text>

            {/* Story text input */}
            <TextInput
              style={{
                height: 100,
                borderColor: Colors[MB_Preferred_Theme ?? "light"].text,
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                color: Colors[MB_Preferred_Theme ?? "light"].text,
              }}
              multiline
              placeholder="What's your story?"
              placeholderTextColor={
                Colors[MB_Preferred_Theme ?? "light"].textSecondary
              }
              value={storyText}
              onChangeText={setStoryText}
            />

            {/* Image selection button */}
            <TouchableOpacity
              onPress={handleSelectImage}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
                backgroundColor: Colors[MB_Preferred_Theme ?? "light"].tint,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Ionicons name="image-outline" size={24} color="#FFFFFF" />
              <Text style={{ marginLeft: 8, color: "#FFFFFF", fontSize: 16 }}>
                {selectedImage ? "Change Image" : "Add Image"}
              </Text>
            </TouchableOpacity>

            {/* Display selected image */}
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{
                  width: "100%",
                  height: 300,
                  marginBottom: 16,
                  borderRadius: 8,
                }}
              />
            )}

            {/* Story duration section */}
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                color: Colors[MB_Preferred_Theme ?? "light"].text,
              }}
            >
              Story Duration:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              {/* Duration options */}
              {[6, 12, 24, 48].map((hours) => (
                <TouchableOpacity
                  key={hours}
                  onPress={() => handleDurationChange(hours)}
                  style={{
                    backgroundColor:
                      duration === hours
                        ? Colors[MB_Preferred_Theme ?? "light"].tint
                        : "transparent",
                    borderColor: Colors[MB_Preferred_Theme ?? "light"].tint,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 8,
                  }}
                >
                  <Text
                    style={{
                      color:
                        duration === hours
                          ? "#FFFFFF"
                          : Colors[MB_Preferred_Theme ?? "light"].text,
                      fontSize: 16,
                    }}
                  >
                    {hours}h
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Location input section */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                Add Location
              </Text>
              <TextInput
                style={{
                  borderColor: Colors[MB_Preferred_Theme ?? "light"].text,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 10,
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
                placeholder="Enter location"
                placeholderTextColor={
                  Colors[MB_Preferred_Theme ?? "light"].textSecondary
                }
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Upload story button */}
            <TouchableOpacity
              onPress={handleUploadStory}
              style={{
                backgroundColor: Colors[MB_Preferred_Theme ?? "light"].tint,
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}
              >
                Upload Story
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ReactNativeModal>
    </SafeAreaView>
  );
}
