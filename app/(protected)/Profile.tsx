/**
 * Renders the user's profile page, including their profile information, statistics, and recent activity.
 *
 * The `ProfilePage` component is the main entry point for the user's profile page. It displays the user's profile picture, name, and bio, as well as their post, follower, and following counts. It also includes an "Edit Profile" button and sections for the user's about information and skills.
 *
 * The component uses various React Native components such as `View`, `Text`, `Image`, `ScrollView`, and `TouchableOpacity` to create the layout and structure of the profile page. It also utilizes the `Ionicons` component from the `@expo/vector-icons` library to display the recent activity icons.
 *
 * This component is likely exported as the main profile page for the application, and can be used throughout the app to display the user's profile information.
 */
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ProfilePage component
const ProfilePage: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView>
        {/* User profile header */}
        <View className="items-center p-6 bg-white">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/10.jpg" }}
            className="w-32 h-32 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold mb-1">John Doe</Text>
          <Text className="text-base text-gray-600 text-center">
            Software Developer | React Native Enthusiast
          </Text>
        </View>

        {/* User statistics */}
        <View className="flex-row justify-around p-6 bg-white mt-2">
          <View className="items-center">
            <Text className="text-lg font-bold">250</Text>
            <Text className="text-sm text-gray-600">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">10k</Text>
            <Text className="text-sm text-gray-600">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">500</Text>
            <Text className="text-sm text-gray-600">Following</Text>
          </View>
        </View>

        {/* Edit profile button */}
        <TouchableOpacity className="bg-blue-500 py-3 px-4 rounded-lg mx-6 mt-4">
          <Text className="text-white text-center font-bold">Edit Profile</Text>
        </TouchableOpacity>

        {/* About Me section */}
        <View className="bg-white p-6 mt-2">
          <Text className="text-xl font-bold mb-3">About Me</Text>
          <Text className="text-base text-gray-700">
            Passionate about creating beautiful and functional mobile
            applications. Love to explore new technologies and share knowledge
            with the community.
          </Text>
        </View>

        {/* Skills section */}
        <View className="bg-white p-6 mt-2">
          <Text className="text-xl font-bold mb-3">Skills</Text>
          <View className="flex-row flex-wrap">
            {/* Map through skills array to render skill tags */}
            {[
              "React Native",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "GraphQL",
            ].map((skill, index) => (
              <View
                key={index}
                className="bg-gray-200 rounded-full py-1 px-3 m-1"
              >
                <Text className="text-sm">{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity section */}
        <View className="bg-white p-6 mt-2">
          <Text className="text-xl font-bold mb-3">Recent Activity</Text>

          {/* Map through activity array to render recent activities */}
          {[1, 2, 3].map((_, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <Ionicons name="code-slash-outline" size={24} color="#3B82F6" />
              <Text className="ml-3 text-base text-gray-700">
                Contributed to open-source project
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfilePage;
