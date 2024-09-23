import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { Button, Input, Icon } from "@rneui/themed";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useHomeStore } from "@/stores/homeStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { MB_Preferred_Theme } = useHomeStore();

  async function signInWithEmail() {
    setLoading(true);
    setError("");
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setError(error.message);
    setLoading(false);
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
        <View className="flex-1 justify-center p-8">
          <Text
            className="text-4xl font-bold text-center mb-12"
            style={{
              color: Colors[MB_Preferred_Theme ?? "light"].text,
            }}
          >
            MeetBudy
          </Text>
          <View className="space-y-6">
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
            <Button
              title="Login"
              loading={loading}
              onPress={signInWithEmail}
              className="bg-blue-600 rounded-lg py-3 mt-6"
              titleStyle={{ fontSize: 18 }}
            />
            <Button
              title="Sign up"
              type="outline"
              onPress={() => router.push("/signup")}
              className="border-blue-600 rounded-lg py-3 mt-4"
              titleStyle={{
                color: Colors[MB_Preferred_Theme ?? "light"].tint,
                fontSize: 18,
              }}
            />
            <TouchableOpacity onPress={() => {}} className="mt-6">
              <Text className="text-center text-blue-600 dark:text-blue-400 text-base">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
