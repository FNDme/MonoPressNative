import { View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useStore } from '~/store/store';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { rssGroups } from '~/constants/rss-feeds';
import { useState } from 'react';
import { CheckCircle } from '~/lib/icons/CheckCircle';
import { PlusCircle } from '~/lib/icons/PlusCircle';
import { ChevronUp } from '~/lib/icons/ChevronUp';
import { ChevronDown } from '~/lib/icons/ChevronDown';

export const PredefinedFeedsCard = () => {
  const { feeds, addFeed, removeFeed } = useStore();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (publisher: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [publisher]: !prev[publisher],
    }));
  };

  const isFeedAdded = (url: string) => feeds.some((feed) => feed.url === url);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predefined Feeds</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-4">
          {rssGroups.map((group) => (
            <View key={group.publisher} className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="flex flex-row items-center justify-between"
                onPress={() =>
                  group.singleFeed ? addFeed(group.feeds[0]) : toggleGroup(group.publisher)
                }>
                <Text className="text-lg font-semibold">{group.publisher}</Text>
                {group.singleFeed ? (
                  isFeedAdded(group.feeds[0].url) ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <PlusCircle size={20} className="text-muted-foreground" />
                  )
                ) : expandedGroups[group.publisher] ? (
                  <ChevronUp size={20} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={20} className="text-muted-foreground" />
                )}
              </Button>
              {!group.singleFeed && expandedGroups[group.publisher] && (
                <View className="ml-4 flex flex-col gap-2">
                  {group.feeds.map((feed) => (
                    <View
                      key={feed.url}
                      className="flex flex-row items-center justify-between gap-2 overflow-hidden rounded-lg border border-border p-3">
                      <View className="flex-1">
                        <Text className="font-medium">{feed.name}</Text>
                      </View>
                      <View className="flex flex-row gap-2">
                        {isFeedAdded(feed.url) ? (
                          <Button variant="ghost" size="icon" onPress={() => removeFeed(feed.url)}>
                            <CheckCircle size={20} className="text-green-500" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" onPress={() => addFeed(feed)}>
                            <PlusCircle size={20} className="text-muted-foreground" />
                          </Button>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
};
