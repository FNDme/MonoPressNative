import { useEffect } from 'react';
import { useStore } from '~/store/store';
import { defaultPresets } from '~/themes/theme-presets';
import { useColorScheme, vars } from 'nativewind';

export function useTheme() {
  const { selectedThemePreset } = useStore();
  const { colorScheme } = useColorScheme();
  const mode = colorScheme || 'light';

  useEffect(() => {
    const preset = defaultPresets[selectedThemePreset];

    // Create theme variables using NativeWind's vars function
    vars({
      ...Object.entries(preset.styles[mode]).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`--${key}`]: value,
        }),
        {}
      ),
    });

    // Apply the theme variables to the root view
    return () => {
      // Cleanup if needed
    };
  }, [mode, selectedThemePreset]);
}
