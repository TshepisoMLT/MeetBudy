import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { Button, Input, Icon } from "@rneui/themed";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { MB_Preferred_Theme } = useHomeStore();

  const validateInputs = () => {
    if (!email || !password || !username || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError("");

    try {
      const { error, data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        console.log(error);
        throw error;
      }

      console.log(data);

      Alert.alert(
        "Sign Up Successful",
        "Please check your email to verify your account.",
        [{ text: "OK", onPress: () => router.replace("/(tabs)") }]
      );
    } catch (error) {
      console.log(error);
      setError("Error...");
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
          backgroundColor: Colors[MB_Preferred_Theme ?? "light"].background,
        }}
      >
        <View className="flex-1 justify-center p-8">
          <Text
            className="text-4xl font-bold text-center mb-12"
            style={{
              color: Colors[MB_Preferred_Theme ?? "light"].text,
            }}
          >
            Join MeetBudy
          </Text>
          <View className="space-y-6">
            <Input
              label="Username"
              leftIcon={
                <Icon
                  type="font-awesome"
                  name="user"
                  color={Colors[MB_Preferred_Theme ?? "light"].tint}
                  size={20}
                />
              }
              onChangeText={setUsername}
              value={username}
              placeholder="user12"
              autoCapitalize="none"
              errorMessage={error}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
            />
            <Input
              label="Email"
              leftIcon={
                <Icon
                  type="font-awesome"
                  name="envelope"
                  color={Colors[MB_Preferred_Theme ?? "light"].tint}
                  size={20}
                />
              }
              onChangeText={setEmail}
              value={email}
              placeholder="email@address.com"
              autoCapitalize="none"
              keyboardType="email-address"
              errorMessage={error}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
            />
            <Input
              label="Password"
              leftIcon={
                <Icon
                  type="font-awesome"
                  name="lock"
                  color={Colors[MB_Preferred_Theme ?? "light"].tint}
                  size={20}
                />
              }
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              errorMessage={error}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
            />
            <Input
              label="Confirm Password"
              leftIcon={
                <Icon
                  type="font-awesome"
                  name="lock"
                  color={Colors[MB_Preferred_Theme ?? "light"].tint}
                  size={20}
                />
              }
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
              placeholder="Confirm Password"
              autoCapitalize="none"
              errorMessage={error}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
            />
            <Button
              title="Sign Up"
              loading={loading}
              onPress={handleSignUp}
              className="rounded-lg py-3 mt-6"
              buttonStyle={{
                backgroundColor: Colors[MB_Preferred_Theme ?? "light"].tint,
              }}
              titleStyle={{ fontSize: 18 }}
            />
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text
                className="text-center"
                style={{
                  color: Colors[MB_Preferred_Theme ?? "light"].tint,
                }}
              >
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
