import { View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useStore } from '~/store/store';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { Ionicons } from '@expo/vector-icons';

export const RSSListCard = () => {
  const { urls, removeUrl } = useStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your RSS Feeds</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-2">
          {urls.map((url) => (
            <View
              key={url}
              className="border-border group flex flex-row items-center justify-between gap-2 overflow-hidden rounded-lg border p-4">
              <Text className="text-muted-foreground line-clamp-1 flex-1 truncate text-ellipsis text-sm">
                {url}
              </Text>
              <Button onPress={() => removeUrl(url)} variant="ghost" size="icon">
                <Ionicons
                  name="trash"
                  size={16}
                  color="red"
                  className="group-hover:text-red-500"
                  style={{ marginRight: 0 }}
                />
              </Button>
            </View>
          ))}
          {urls.length === 0 && (
            <Text className="text-muted-foreground text-center">No RSS feeds added yet.</Text>
          )}
        </View>
      </CardContent>
    </Card>
  );
};
