import React from 'react';
import { View } from 'react-native';
import { vars, useColorScheme } from 'nativewind';
import { useStore } from '~/store/store';
import { defaultPresets } from '~/themes/theme-presets';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { selectedThemePreset } = useStore();
  const { colorScheme } = useColorScheme();
  const mode = colorScheme || 'light';
  const preset = defaultPresets[selectedThemePreset];

  const themeVars = vars({
    ...Object.entries(preset.styles[mode]).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--${key}`]: value,
      }),
      {}
    ),
  });

  return (
    <View style={themeVars} className="flex-1">
      {children}
    </View>
  );
}
