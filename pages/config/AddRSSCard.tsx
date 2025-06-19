import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';
import { useStore } from '~/store/store';
import { View } from 'react-native';

export const AddRSSCard = () => {
  const [rssUrl, setRssUrl] = useState('');
  const [feedName, setFeedName] = useState('');
  const { addFeed } = useStore();

  const handleAddRSS = () => {
    if (rssUrl.trim() && feedName.trim()) {
      addFeed({ name: feedName.trim(), url: rssUrl.trim() });
      setRssUrl('');
      setFeedName('');
    }
  };

  const isFormValid = rssUrl.trim() && feedName.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add RSS Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-4">
          <Input
            placeholder="Feed name (e.g., My Tech Blog)"
            value={feedName}
            onChangeText={setFeedName}
          />
          <Input placeholder="Enter RSS feed URL" value={rssUrl} onChangeText={setRssUrl} />
          <Button onPress={handleAddRSS} disabled={!isFormValid}>
            <Text>Add Feed</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
};
