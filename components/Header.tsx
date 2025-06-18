import { View } from 'react-native';
import { ThemeToggle } from './shared/theme-toggle';
import { Text } from './ui/text';
import { Settings } from '~/lib/icons/Settings';
import { Button } from './ui/button';
import { EyeOff } from '~/lib/icons/EyeOff';
import { Eye } from '~/lib/icons/Eye';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '~/App';
import { Bookmark } from '~/lib/icons/Bookmark';
import { BookmarkCheck } from '~/lib/icons/BookmarkCheck';

export const Header = ({
  onDiscardPress,
  showDiscarded,
  onBookmarkPress,
  showBookmarks,
}: {
  onDiscardPress: () => void;
  onBookmarkPress: () => void;
  showDiscarded: boolean;
  showBookmarks: boolean;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View className="flex flex-row items-center justify-between border-b border-border bg-background px-6 py-4">
      <Text className="text-2xl font-bold text-foreground">MonoPress</Text>
      <View className="flex flex-row items-center gap-2">
        {showBookmarks ? null : (
          <Button onPress={onDiscardPress} variant="ghost" size="icon">
            {showDiscarded ? (
              <Eye size={20} className="text-foreground" />
            ) : (
              <EyeOff size={20} className="text-foreground" />
            )}
          </Button>
        )}
        {showDiscarded ? null : (
          <Button onPress={onBookmarkPress} variant="ghost" size="icon">
            {showBookmarks ? (
              <BookmarkCheck size={20} className="text-foreground" />
            ) : (
              <Bookmark size={20} className="text-foreground" />
            )}
          </Button>
        )}
        <ThemeToggle />
        <Button onPress={() => navigation.navigate('Config')} variant="ghost" size="icon">
          <Settings size={20} className="text-foreground" />
        </Button>
      </View>
    </View>
  );
};
