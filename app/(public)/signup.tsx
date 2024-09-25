import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";
import { Ionicons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";

const { width } = Dimensions.get("window");

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { MB_Preferred_Theme } = useHomeStore();

  const { signUp, setActive } = useSignUp();

  const validateInputs = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Valid email is required");
      return false;
    }
    if (
      password.length < 6 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      setError(
        "Password must be at least 6 characters with lowercase, uppercase, and number"
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const onSignUpPress = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    setError("");
    try {
      if (signUp) {
        const data = await signUp.create({
          emailAddress: email,
          username,
          password,
        });
        console.log("data: ", data);
        if (data.createdUserId) router.replace("/(protected)");
      }
    } catch (err: any) {
      console.error("error: ", JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].border,
        }}
      >
        <View className="h-1/4 p-10 justify-center">
          <View className="items-center justify-center rounded-2xl px-4 py-2">
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={width * 0.12}
              color={Colors[MB_Preferred_Theme ?? "light"].tabIconSelected}
            />
            <Text
              className="text-6xl font-bold text-center mb-2"
              style={{
                color: Colors[MB_Preferred_Theme ?? "light"].text,
              }}
            >
              MeetBudy
            </Text>
          </View>
        </View>
        <View
          className="flex-1 justify-center p-8 rounded-t-3xl space-y-6"
          style={{
            backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
          }}
        >
          <View className="space-y-4">
            {/* Username Input */}
            <View>
              <Text
                className="text-lg font-semibold mb-1"
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
              >
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                className="rounded-lg px-4 py-3"
                placeholderTextColor={
                  Colors[MB_Preferred_Theme ?? "light"].textSecondary
                }
                style={{
                  backgroundColor: Colors[MB_Preferred_Theme ?? "light"].input,
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
                accessibilityLabel="Username input"
              />
            </View>
            {/* Email Input */}
            <View>
              <Text
                className="text-lg font-semibold mb-1"
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                className="rounded-lg px-4 py-3"
                placeholderTextColor={
                  Colors[MB_Preferred_Theme ?? "light"].textSecondary
                }
                style={{
                  backgroundColor: Colors[MB_Preferred_Theme ?? "light"].input,
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email input"
              />
            </View>
            {/* Password Input */}
            <View>
              <Text
                className="text-lg font-semibold mb-1"
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
              >
                Password
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  className="rounded-lg px-4 py-3 pr-10"
                  placeholderTextColor={
                    Colors[MB_Preferred_Theme ?? "light"].textSecondary
                  }
                  style={{
                    backgroundColor:
                      Colors[MB_Preferred_Theme ?? "light"].input,
                    color: Colors[MB_Preferred_Theme ?? "light"].text,
                  }}
                  secureTextEntry={!showPassword}
                  accessibilityLabel="Password input"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color={Colors[MB_Preferred_Theme ?? "light"].text}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Confirm Password Input */}
            <View>
              <Text
                className="text-lg font-semibold mb-1"
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
              >
                Confirm Password
              </Text>
              <View className="relative">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  className="rounded-lg px-4 py-3 pr-10"
                  placeholderTextColor={
                    Colors[MB_Preferred_Theme ?? "light"].textSecondary
                  }
                  style={{
                    backgroundColor:
                      Colors[MB_Preferred_Theme ?? "light"].input,
                    color: Colors[MB_Preferred_Theme ?? "light"].text,
                  }}
                  secureTextEntry={!showConfirmPassword}
                  accessibilityLabel="Confirm password input"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                    color={Colors[MB_Preferred_Theme ?? "light"].text}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {error && (
            <Text className="text-red-500 text-center font-semibold">
              {error}
            </Text>
          )}

          <View className="flex-col pt-6">
            <TouchableOpacity
              onPress={onSignUpPress}
              disabled={loading}
              className="rounded-2xl py-3"
              style={{
                backgroundColor:
                  Colors[MB_Preferred_Theme ?? "light"].buttonPrimary,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator
                  color={Colors[MB_Preferred_Theme ?? "light"].buttonText}
                  size="small"
                />
              ) : (
                <Text
                  className="text-center text-xl font-bold"
                  style={{
                    color: Colors[MB_Preferred_Theme ?? "light"].buttonText,
                  }}
                >
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-medium">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <View className="space-y-3">
            <View className="flex-row justify-evenly space-x-4">
              <TouchableOpacity
                onPress={() => {}}
                className="rounded-full p-3 bg-gray-200 flex-row justify-center items-center"
              >
                <Ionicons name="logo-google" size={28} color="#DB4437" />
                <Text className="text-gray-800 text-center ml-2 font-semibold">
                  Continue with Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="rounded-full p-3 bg-[#3b5998] flex-row justify-center items-center"
              >
                <Ionicons name="logo-facebook" size={28} color="white" />
                <Text className="text-gray-200 text-center ml-2 font-semibold">
                  Continue with Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.push("/login");
            }}
            className="mt-6 justify-center items-center"
          >
            <Text
              style={{
                color: Colors[MB_Preferred_Theme ?? "light"].info,
              }}
              className="text-center text-base font-semibold"
            >
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
