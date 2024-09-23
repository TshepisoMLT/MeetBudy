/**
 * Defines the color configurations for the light and dark themes of the application.
 * The `tintColorLight` and `tintColorDark` variables define the accent colors for the respective themes.
 * The `Colors` object exports the color configurations for the light and dark themes, including primary and secondary text colors, background colors, icon colors, and tab icon colors.
 */
// Define tint colors for light and dark themes
const tintColorLight = "#2196F3";
const tintColorDark = "#64B5F6";

// Export color configurations for light and dark themes
export const Colors = {
  // Light theme colors
  light: {
    text: "#333333",
    textSecondary: "#757575",
    background: "#FFFFFF",
    tint: tintColorLight,
    icon: "#757575",
    tabIconDefault: "#BDBDBD",
    tabIconSelected: tintColorLight,
    container: "#F5F5F5",
    primary: "#FF4081",
    secondary: "#00BCD4",
    accent: "#FFC107",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
  },
  // Dark theme colors
  dark: {
    text: "#E0E0E0",
    textSecondary: "#BDBDBD",
    background: "#121212",
    tint: tintColorDark,
    icon: "#BDBDBD",
    tabIconDefault: "#757575",
    tabIconSelected: tintColorDark,
    container: "#1E1E1E",
    primary: "#FF80AB",
    secondary: "#4DD0E1",
    accent: "#FFD54F",
    success: "#81C784",
    warning: "#FFB74D",
    error: "#E57373",
  },
};
