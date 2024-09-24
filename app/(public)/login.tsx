import React, { useState, useRef, useEffect } from "react";
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

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { MB_Preferred_Theme } = useHomeStore();
  const emailInputRef = useRef<TextInput>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  async function signInWithEmail() {
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setError(error.message);
    setLoading(false);
  }

  function validateForm() {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    return true;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
        }}
      >
        <View className="h-2/5 p-10 justify-center">
          <ImageBackground
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1828/1828506.png",
            }}
            className="w-full h-full items-center justify-end"
            resizeMode="contain"
          >
            <View className="items-center justify-center bg-slate-700/40 rounded-2xl px-4 py-2">
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
          </ImageBackground>
        </View>
        <View
          className="flex-1 justify-center p-8 rounded-t-3xl space-y-6"
          style={{
            backgroundColor:
              Colors[MB_Preferred_Theme ?? "light"].modalBackground,
          }}
        >
          <View className="space-y-4">
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
                ref={emailInputRef}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                className="rounded-lg px-4 py-3"
                placeholderTextColor={
                  Colors[MB_Preferred_Theme ?? "light"].textSecondary
                }
                style={{
                  backgroundColor:
                    Colors[MB_Preferred_Theme ?? "light"].background,
                  color: Colors[MB_Preferred_Theme ?? "light"].text,
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email input"
              />
            </View>
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
                      Colors[MB_Preferred_Theme ?? "light"].background,
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
          </View>

          {error && (
            <Text className="text-red-500 text-center font-semibold">
              {error}
            </Text>
          )}

          <View className="flex-col pt-6">
            <TouchableOpacity
              onPress={signInWithEmail}
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
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Text className="text-base text-right my-3 font-semibold">
                Forgot Password?
              </Text>
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
                className="rounded-full p-3 bg-white flex-row justify-center items-center"
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
              router.push("/signup");
            }}
            className="mt-6 justify-center items-center"
          >
            <Text
              style={{
                color: Colors[MB_Preferred_Theme ?? "light"].info,
              }}
              className="text-center text-base font-semibold"
            >
              Don't have an account? Sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
