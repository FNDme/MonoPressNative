import { useStore } from '~/store/store';
import { defaultPresets, DefaultThemes } from '~/constants/theme-presets';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from '~/components/ui/select';
import type { ThemePreset } from '~/types/theme-types';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';

const getTextStyle = (preset: ThemePreset, mode: 'light' | 'dark') => {
  return {
    color: preset.styles[mode].foreground,
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
          className="w-[280px] overflow-hidden rounded-lg p-0 shadow-lg"
          position="item-aligned"
          sideOffset={4}>
          <ScrollView className="max-h-80">
            <SelectGroup onStartShouldSetResponder={() => true}>
              {Object.entries(defaultPresets).map(([key, preset]) => (
                <SelectItem
                  key={key}
                  value={key}
                  label={preset.label || key}
                  textStyle={getTextStyle(preset, mode)}
                  style={{
                    backgroundColor: preset.styles[mode].background,
                  }}
                />
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
