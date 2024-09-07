// Import the useColorScheme hook from react-native
import { useColorScheme } from 'react-native';

// Import the Colors object from the local constants directory
import { Colors } from '@/constants/Colors';

/**
 * A custom hook to get the appropriate color based on the current theme
 * @param props - An object containing optional light and dark color values
 * @param colorName - The name of the color in the Colors object
 * @returns The appropriate color value based on the current theme
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Get the current color scheme, defaulting to 'light' if undefined
  const theme = useColorScheme() ?? 'light';
  
  // Check if a color is provided in the props for the current theme
  const colorFromProps = props[theme];

  // Return the color from props if available, otherwise return the color from the Colors object
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
