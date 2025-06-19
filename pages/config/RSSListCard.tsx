import { View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useStore } from '~/store/store';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { rssGroups } from '~/constants/rss-feeds';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Check } from '~/lib/icons/Check';
import { PenLine } from '~/lib/icons/PenLine';
import { Trash } from '~/lib/icons/Trash';
import { X } from '~/lib/icons/X';

export const RSSListCard = () => {
  const { feeds, removeFeed, updateFeedName } = useStore();
  const [editingFeed, setEditingFeed] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

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

  const handleEditName = (feed: { name: string; url: string }) => {
    setEditingFeed(feed.url);
    setEditName(feed.name);
  };

  const handleSaveName = () => {
    if (editingFeed && editName.trim()) {
      updateFeedName(editingFeed, editName.trim());
      setEditingFeed(null);
      setEditName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingFeed(null);
    setEditName('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your RSS Feeds</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-2">
          {feeds.map((feed) => {
            const feedInfo = getFeedInfo(feed.url);
            const isEditing = editingFeed === feed.url;

            return (
              <View
                key={feed.url}
                className="group flex flex-row items-center justify-between gap-2 overflow-hidden rounded-lg border border-border p-4">
                <View className="flex-1">
                  {isEditing ? (
                    <View className="flex flex-row items-center gap-2">
                      <Input
                        value={editName}
                        onChangeText={setEditName}
                        className="flex-1"
                        autoFocus
                      />
                      <Button onPress={handleSaveName} size="sm" variant="ghost">
                        <Check size={16} className="text-green-500" />
                      </Button>
                      <Button onPress={handleCancelEdit} size="sm" variant="ghost">
                        <X size={16} className="text-red-500" />
                      </Button>
                    </View>
                  ) : (
                    <>
                      <Text className="font-medium">{feed.name}</Text>
                      {feedInfo && (
                        <Text className="text-xs text-muted-foreground">{feedInfo.publisher}</Text>
                      )}
                      <Text className="text-xs text-muted-foreground">{feed.url}</Text>
                    </>
                  )}
                </View>
                {!isEditing && (
                  <View className="flex flex-row gap-2">
                    <Button onPress={() => handleEditName(feed)} variant="ghost" size="icon">
                      <PenLine size={16} className="text-muted-foreground" />
                    </Button>
                    <Button onPress={() => removeFeed(feed.url)} variant="ghost" size="icon">
                      <Trash size={16} className="text-muted-foreground" />
                    </Button>
                  </View>
                )}
              </View>
            );
          })}
          {feeds.length === 0 && (
            <Text className="text-center text-muted-foreground">No RSS feeds added yet.</Text>
          )}
        </View>
      </CardContent>
    </Card>
  );
};
