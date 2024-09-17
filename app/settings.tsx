import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHomeStore } from "@/stores/homeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingItem = ({
  label,
  value,
  onValueChange,
  icon,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon:
    | "notifications-outline"
    | "moon-outline"
    | "refresh-outline"
    | "sunny-outline";
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <Ionicons name={icon} size={24} color="#007AFF" style={styles.icon} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={value ? "#007AFF" : "#f4f3f4"}
    />
  </View>
);

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const { MB_Preferred_Theme, setMB_Preferred_Theme } = useHomeStore();

  const toggleTheme = async () => {
    if (MB_Preferred_Theme === "light") {
      setMB_Preferred_Theme("dark");
      await AsyncStorage.setItem("MB_Preferred_Theme", "dark");
    } else if (MB_Preferred_Theme === "dark") {
      setMB_Preferred_Theme("light");
      await AsyncStorage.setItem("MB_Preferred_Theme", "light");
    } else if (MB_Preferred_Theme === "default") {
      setMB_Preferred_Theme("light");
      await AsyncStorage.setItem("MB_Preferred_Theme", "default");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Appearance</Text>
        <SettingItem
          label={
            MB_Preferred_Theme === "light"
              ? "Switch to Dark Mode"
              : "Switch to Light Mode"
          }
          value={MB_Preferred_Theme === "light" ? false : true}
          onValueChange={toggleTheme}
          icon={
            MB_Preferred_Theme === "light" ? "moon-outline" : "sunny-outline"
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Notifications</Text>
        <SettingItem
          label="Push Notifications"
          value={notifications}
          onValueChange={setNotifications}
          icon="notifications-outline"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Updates</Text>
        <SettingItem
          label="Auto Update"
          value={autoUpdate}
          onValueChange={setAutoUpdate}
          icon="refresh-outline"
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsPage;
