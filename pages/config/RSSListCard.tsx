import { View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useStore } from '~/store/store';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { rssGroups } from '~/constants/rss-feeds';

export const RSSListCard = () => {
  const { urls, removeUrl } = useStore();

  const getFeedInfo = (url: string) => {
    for (const group of rssGroups) {
      const feed = group.feeds.find((f) => f.url === url);
      if (feed) {
        return {
          publisher: group.publisher,
          name: feed.name,
        };
      }
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your RSS Feeds</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-2">
          {urls.map((url) => {
            const feedInfo = getFeedInfo(url);
            return (
              <View
                key={url}
                className="group flex flex-row items-center justify-between gap-2 overflow-hidden rounded-lg border border-border p-4">
                <View className="flex-1">
                  {feedInfo ? (
                    <>
                      <Text className="font-medium">{feedInfo.name}</Text>
                      <Text className="text-xs text-muted-foreground">{feedInfo.publisher}</Text>
                    </>
                  ) : (
                    <Text className="line-clamp-1 truncate text-ellipsis text-sm text-muted-foreground">
                      {url}
                    </Text>
                  )}
                </View>
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
            );
          })}
          {urls.length === 0 && (
            <Text className="text-center text-muted-foreground">No RSS feeds added yet.</Text>
          )}
        </View>
      </CardContent>
    </Card>
  );
};
