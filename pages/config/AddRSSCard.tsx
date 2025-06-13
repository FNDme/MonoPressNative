import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';
import { useStore } from '~/store/store';

export const AddRSSCard = () => {
  const [rssUrl, setRssUrl] = useState('');
  const { addUrl } = useStore();

  const handleAddRSS = () => {
    addUrl(rssUrl);
    setRssUrl('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add RSS Feed</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-row gap-4">
        <Input
          className="flex-1"
          placeholder="Enter RSS feed URL"
          value={rssUrl}
          onChangeText={setRssUrl}
        />
        <Button onPress={handleAddRSS}>
          <Text>Add</Text>
        </Button>
      </CardContent>
    </Card>
  );
};
