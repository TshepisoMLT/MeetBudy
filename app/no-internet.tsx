/**
 * The `NotFound` component represents a 404 error page for the application. It displays an error image, an alert icon, an error title and description, and provides links to the homepage and contact support.
 *
 * This component is exported as the default export and can be used in the application to handle 404 errors.
 */
import { Link } from "expo-router";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// NotFound component for 404 error page
export default function NotFound() {
  return (
    // Main container with styling
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      {/* 404 error image */}
      <Image
        source={require("../assets/images/ErrorPage404-05.jpg")}
        className="w-64 h-64 mb-8"
        resizeMode="cover"
      />

      {/* Alert icon */}
      <Ionicons
        name="alert-circle-outline"
        size={80}
        color="#3b82f6"
        className="mb-6"
      />

      {/* Error title */}
      <Text className="text-3xl font-bold mb-4 text-center text-gray-800">
        No internet connection
      </Text>

      {/* Error description */}
      <Text className="text-lg mb-8 text-center text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </Text>

      {/* Link to homepage */}
      <Link
        href="/"
        className="bg-blue-500 px-6 py-3 rounded-lg shadow-md active:bg-blue-600"
      >
        <Text className="text-white font-semibold text-lg">Refresh</Text>
      </Link>

      {/* Support section */}
      <View className="mt-12 items-center">
        <Text className="text-sm text-gray-500 mb-2">Need assistance?</Text>

        {/* Link to contact support */}
        <Link href="/settings" className="text-blue-500 font-medium">
          Contact Support
        </Link>
      </View>
    </View>
  );
}
