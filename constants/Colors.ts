/**
 * Defines the color configurations for the light and dark themes of the application.
 * The `tintColorLight` and `tintColorDark` variables define the accent colors for the respective themes.
 * The `Colors` object exports the color configurations for the light and dark themes, including primary and secondary text colors, background colors, icon colors, and tab icon colors.
 */
// Define tint colors for light and dark themes
const tintColorLight = '#2196F3';
const tintColorDark = '#64B5F6';

// Export color configurations for light and dark themes
export const Colors = {
  // Light theme colors
  light: {
    text: "#333333",            // Primary text color
    textSecondary: "#757575",   // Secondary text color
    background: "#FFFFFF",      // Background color
    tint: tintColorLight,       // Tint color (accent color)
    icon: "#757575",            // Icon color
    tabIconDefault: "#BDBDBD",  // Default tab icon color
    tabIconSelected: tintColorLight, // Selected tab icon color
    container: "#F5F5F5",       // Container background color
  },
  // Dark theme colors
  dark: {
    text: "#E0E0E0",            // Primary text color
    textSecondary: "#BDBDBD",   // Secondary text color
    background: "#121212",      // Background color
    tint: tintColorDark,        // Tint color (accent color)
    icon: "#BDBDBD",            // Icon color
    tabIconDefault: "#757575",  // Default tab icon color
    tabIconSelected: tintColorDark, // Selected tab icon color
    container: "#1E1E1E",       // Container background color
  },
};
