import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import React, { useState } from "react";
import ReactNativeModal from "react-native-modal";
import { useHomeStore } from "@/stores/homeStore";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const EditProfile = ({
  isEditModalVisible,
  setIsEditModalVisible,
}: {
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { MB_Preferred_Theme, setMB_Preferred_Theme } = useHomeStore();
  const { user } = useUser();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [bio, setBio] = useState(
    "Software Developer | React Native Enthusiast"
  );
  const [profileImage, setProfileImage] = useState(user?.imageUrl ?? "");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    linkedin: "",
    github: "",
  });
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [email, setEmail] = useState(
    user?.primaryEmailAddress?.emailAddress ?? ""
  );
  const [phone, setPhone] = useState(user?.phoneNumbers[0]?.phoneNumber ?? "");
  const [preferredTheme, setPreferredTheme] = useState(MB_Preferred_Theme);
  const [language, setLanguage] = useState("English");
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    // Implement save logic here
    setMB_Preferred_Theme(preferredTheme);
    setIsEditModalVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    console.log("Account deletion requested");
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Implement password change logic here
      console.log("Password change requested");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <ReactNativeModal
      isVisible={isEditModalVisible}
      onBackdropPress={() => setIsEditModalVisible(false)}
      className="m-0 justify-end"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View
        className={`rounded-t-3xl p-5 h-[90%] ${
          preferredTheme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-2xl font-bold">Edit Profile</Text>
          <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
            <Ionicons
              name="close"
              size={24}
              color={Colors[preferredTheme ?? "light"].text}
            />
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1">
          <View className="items-center mb-5">
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full mb-2"
            />
            <TouchableOpacity
              className="px-2 py-1 bg-gray-200 rounded"
              onPress={pickImage}
            >
              <Text className="text-gray-700 text-sm">
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base font-semibold mb-2 mt-4">Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            className={`border rounded-lg p-3 mb-4 text-base ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />
          <Text className="text-base font-semibold mb-2 mt-4">Bio</Text>
          <TextInput
            placeholder="Tell us about yourself"
            value={bio}
            onChangeText={setBio}
            className={`border rounded-lg p-3 mb-4 text-base h-24 ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
            multiline
          />
          <Text className="text-base font-semibold mb-2 mt-4">Skills</Text>
          <View className="flex-row flex-wrap mb-2">
            {skills.map((skill, index) => (
              <View
                key={index}
                className="flex-row items-center bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2"
              >
                <Text>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(skill)}>
                  <Ionicons name="close-circle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View className="flex-row items-center mb-4">
            <TextInput
              placeholder="Add a new skill"
              value={newSkill}
              onChangeText={setNewSkill}
              className={`flex-1 mr-2 border rounded-lg p-3 text-base ${
                preferredTheme === "dark"
                  ? "border-gray-600"
                  : "border-gray-300"
              }`}
            />
            <TouchableOpacity
              className="bg-blue-500 rounded-lg p-3"
              onPress={addSkill}
            >
              <Text className="text-white font-bold">Add</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base font-semibold mb-2 mt-4">
            Social Media Links
          </Text>
          <TextInput
            placeholder="Twitter"
            value={socialLinks.twitter}
            onChangeText={(text) =>
              setSocialLinks({ ...socialLinks, twitter: text })
            }
            className={`border rounded-lg p-3 mb-4 text-base ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />
          <TextInput
            placeholder="LinkedIn"
            value={socialLinks.linkedin}
            onChangeText={(text) =>
              setSocialLinks({ ...socialLinks, linkedin: text })
            }
            className={`border rounded-lg p-3 mb-4 text-base ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />
          <TextInput
            placeholder="GitHub"
            value={socialLinks.github}
            onChangeText={(text) =>
              setSocialLinks({ ...socialLinks, github: text })
            }
            className={`border rounded-lg p-3 mb-4 text-base ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />
          <Text className="text-base font-semibold mb-2 mt-4">
            Privacy Settings
          </Text>
          <View className="flex-row justify-between items-center mb-4">
            <Text>Make profile public</Text>
            <Switch
              value={isProfilePublic}
              onValueChange={setIsProfilePublic}
            />
          </View>
          <Text className="text-base font-semibold mb-2 mt-4">
            Contact Information
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className={`border rounded-lg p-3 mb-4 text-base ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            className={`border rounded-lg p-3 mb-4 text-base ${
              preferredTheme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />  
        </ScrollView>
        <TouchableOpacity
          className={`p-4 rounded-lg items-center mt-5 ${
            preferredTheme === "dark" ? "bg-blue-600" : "bg-blue-500"
          }`}
          onPress={handleSave}
        >
          <Text className="text-white text-lg font-bold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default EditProfile;
