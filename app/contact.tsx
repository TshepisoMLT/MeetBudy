/**
 * A React functional component that renders a contact form with input fields for name, email, and message.
 * The form includes validation to ensure required fields are filled out correctly, and provides a submit button to handle form submission.
 * After successful submission, the form data is logged to the console and a success alert is displayed.
 * The form data is stored in the component's state and updated as the user types in the input fields.
 */

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

// Interface for the props of the InputField component
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: "auto" | "top" | "bottom" | "center";
}

// InputField component for rendering form input fields
const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = "auto",
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium mb-2 text-gray-700">{label}</Text>
      <TextInput
        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
        accessibilityLabel={label}
      />
    </View>
  );
};

// Interface for the form data structure
interface FormData {
  name: string;
  email: string;
  message: string;
}

// ContactForm component for rendering the entire contact form
const ContactForm: React.FC = () => {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Function to handle changes in form input fields
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to validate form data before submission
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (!formData.message.trim()) {
      Alert.alert("Error", "Message is required");
      return false;
    }

    return true;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      Alert.alert("Success", "Your message has been sent!");
      
      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
    }
  };

  // Render the contact form
  return (
    <View className="flex-1 bg-gray-100 p-6">
      <Text className="text-3xl font-bold mb-8 text-center text-gray-800">
        Contact Us
      </Text>
      <View className="bg-white rounded-lg shadow-md p-6">
        {/* Name input field */}
        <InputField
          label="Name"
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Enter your name"
        />
        {/* Email input field */}
        <InputField
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        {/* Message input field */}
        <InputField
          label="Message"
          value={formData.message}
          onChangeText={(value) => handleChange("message", value)}
          placeholder="Enter your message"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {/* Submit button */}
        <TouchableOpacity
          className="w-full bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-md"
          onPress={handleSubmit}
          accessibilityLabel="Send Message"
        >
          <Text className="text-center text-white font-semibold">
            Send Message
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactForm;
