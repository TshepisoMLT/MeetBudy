/**
 * UploadPostModal is a React component that provides a modal interface for users to create and upload new posts.
 * It allows users to enter post content, select an image, toggle post visibility, and add a location.
 * The component uses the UploadStore to manage the state of the post creation process.
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
  Switch,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { useUploadStore } from "@/stores/UploadStore";
import * as ImagePicker from "expo-image-picker";
import { useHomeStore } from "@/stores/homeStore";

// Component for uploading a new post
export default function UploadPostModal() {
  // Get the current color scheme (light/dark)
  const { MB_Preferred_Theme } = useHomeStore();
  // Get the posting state and setter from the upload store
  const { setIsPostingPost, isPostingPost } = useUploadStore();
  // State for post content
  const [postContent, setPostContent] = useState("");
  // State for selected image
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  // State for post visibility (public/private)
  const [isPublic, setIsPublic] = useState(true);
  // State for post location
  const [location, setLocation] = useState("");

  // Function to handle post upload
  const handleUploadPost = () => {
    // Handle post upload logic here
    console.log("Uploading post: ", {
      content: postContent,
      image: selectedImage,
      public: isPublic,
      location: location,
    });
    setIsPostingPost(false);
    setPostContent("");
    setSelectedImage(null);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Modal for creating a new post */}
      <ReactNativeModal
        isVisible={isPostingPost}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setIsPostingPost(false)}
        onBackButtonPress={() => setIsPostingPost(false)}
        swipeDirection={["down"]}
        onSwipeComplete={() => setIsPostingPost(false)}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <ScrollView
          style={{
            backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            maxHeight: "100%",
          }}
        >
          <View style={{ padding: 20 }}>
            {/* Drag indicator */}
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
              Create New Post
            </Text>
            {/* Post content input */}
            <TextInput
              style={{
                height: 150,
                borderColor: Colors[MB_Preferred_Theme ?? "light"].text,
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                color: Colors[MB_Preferred_Theme ?? "light"].text,
              }}
              multiline
              placeholder="What's on your mind?"
              placeholderTextColor={
                Colors[MB_Preferred_Theme ?? "light"].textSecondary
              }
              value={postContent}
              onChangeText={setPostContent}
            />
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
                resizeMode="cover"
              />
            )}
            {/* Button to select/change image */}
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
            {/* Toggle for post visibility */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                  fontSize: 16,
                }}
              >
                Make post public
              </Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{
                  false: "#767577",
                  true: Colors[MB_Preferred_Theme ?? "light"].tint,
                }}
                thumbColor={isPublic ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>
            {/* Location input */}
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
            {/* Upload post button */}
            <TouchableOpacity
              onPress={handleUploadPost}
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
                Upload Post
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ReactNativeModal>
    </SafeAreaView>
  );
}
