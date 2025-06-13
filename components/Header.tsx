import { View } from 'react-native';
import { ThemeToggle } from './shared/theme-toggle';
import { Text } from './ui/text';
import { Newspaper } from '~/lib/icons/Newspaper';
import { Settings } from '~/lib/icons/Settings';
import { Button } from './ui/button';

type HeaderProps = {
  isConfigScreen?: boolean;
  onScreenChange: (screen: 'Main' | 'Config') => void;
};

export const Header = ({ isConfigScreen = false, onScreenChange }: HeaderProps) => {
  const handleIconPress = () => {
    if (isConfigScreen) {
      onScreenChange('Main');
    } else {
      onScreenChange('Config');
    }
  };

  return (
    <View className="flex flex-row items-center justify-between border-b border-border bg-background px-6 py-4">
      <Text className="text-2xl font-bold text-foreground">MonoPress</Text>
      <View className="flex flex-row items-center gap-2">
        <ThemeToggle />
        <Button onPress={handleIconPress} variant="ghost" size="icon">
          {isConfigScreen ? (
            <Newspaper size={20} className="text-foreground" />
          ) : (
            <Settings size={20} className="text-foreground" />
          )}
        </Button>
      </View>
    </View>
  );
};
