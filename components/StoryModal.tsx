import { View, Text, Image, TouchableOpacity, StatusBar, Modal } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";


type StoryModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
export default function StoryModal({ isModalOpen, setIsModalOpen }: StoryModalProps) {
  const colorScheme = useColorScheme();

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
      transparent
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Text className="text-blue-500 text-center font-bold text-2xl">
        Hello
      </Text>
    </Modal>
  );
}
