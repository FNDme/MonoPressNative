import { View } from 'react-native';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '~/App';

export const EmptyState = ({
  page,
  toggleBookmarks,
  toggleDiscarded,
}: {
  page: 'home' | 'hidden' | 'bookmarks';
  toggleBookmarks: () => void;
  toggleDiscarded: () => void;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View className="h-full flex-1 items-center justify-center gap-4 p-4">
      {page === 'home' && (
        <>
          <Text className="text-center text-muted-foreground">No posts to display</Text>
          <Button variant="outline" onPress={() => navigation.navigate('RSSManagement')}>
            <Text>Add a feed</Text>
          </Button>
        </>
      )}
      {page === 'hidden' && (
        <>
          <Text className="text-center text-muted-foreground">No hidden posts</Text>
          <Button variant="outline" onPress={toggleDiscarded}>
            <Text>Go back</Text>
          </Button>
        </>
      )}
      {page === 'bookmarks' && (
        <>
          <Text className="text-center text-muted-foreground">No bookmarks</Text>
          <Button variant="outline" onPress={toggleBookmarks}>
            <Text>Go back</Text>
          </Button>
        </>
      )}
    </View>
  );
};
