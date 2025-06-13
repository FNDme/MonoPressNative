import { useStore } from '~/store/store';
import { defaultPresets, DefaultThemes } from '~/themes/theme-presets';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from '~/components/ui/select';
import type { ThemePreset } from '~/themes/theme-types';
import { View, StyleSheet, type ViewStyle, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';

function ColorPreview({
  colors,
  mode,
}: {
  colors: { [key: string]: string };
  mode: 'light' | 'dark';
}) {
  return (
    <View style={styles.colorPreviewContainer}>
      <View style={[styles.colorBox, { backgroundColor: colors.background }]} />
      <View style={[styles.colorBox, { backgroundColor: colors.primary }]} />
      <View style={[styles.colorBox, { backgroundColor: colors.secondary }]} />
      <View style={[styles.colorBox, { backgroundColor: colors.accent }]} />
    </View>
  );
}

const getThemeStyle = (preset: ThemePreset, mode: 'light' | 'dark'): ViewStyle => {
  return {
    borderColor: preset.styles[mode].border,
    borderRadius: Number(preset.styles[mode].radius),
    padding: Number(preset.styles[mode].spacing),
  };
};

const getTextStyle = (preset: ThemePreset, mode: 'light' | 'dark') => {
  return {
    color: preset.styles[mode].foreground,
    fontFamily: preset.styles[mode]['font-sans'],
  };
};

export function ThemeSelector() {
  const { selectedThemePreset, setSelectedThemePreset } = useStore();
  const { colorScheme } = useColorScheme();
  const mode = colorScheme || 'light';

  const handleValueChange = (option: Option) => {
    if (option && typeof option.value === 'string') {
      setSelectedThemePreset(option.value as DefaultThemes);
    }
  };

  const selectedThemePresetOption = {
    label: defaultPresets[selectedThemePreset].label,
    value: selectedThemePreset,
  } as Option;

  return (
    <View style={styles.container}>
      <Select value={selectedThemePresetOption} onValueChange={handleValueChange}>
        <SelectTrigger style={styles.trigger}>
          <SelectValue placeholder="Select theme" className="text-foreground" />
        </SelectTrigger>
        <SelectContent
          insets={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="w-[280px] rounded-lg shadow-lg"
          position="popper"
          sideOffset={4}>
          <ScrollView className="max-h-80">
            <SelectGroup onStartShouldSetResponder={() => true}>
              {Object.entries(defaultPresets).map(([key, preset]) => (
                <SelectItem key={key} value={key} label={preset.label || key}>
                  <View style={[styles.itemContent, getThemeStyle(preset, mode)]}>
                    <ColorPreview colors={preset.styles[mode]} mode={mode} />
                    <Text style={getTextStyle(preset, mode)}>{preset.label || key}</Text>
                  </View>
                </SelectItem>
              ))}
            </SelectGroup>
          </ScrollView>
        </SelectContent>
      </Select>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  trigger: {
    width: 280,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  colorPreviewContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
  },
});
