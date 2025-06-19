import { View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '~/App';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import { useStore } from '~/store/store';

export const RSSManagementCard = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { feeds } = useStore();

  const handleNavigateToRSSManagement = () => {
    navigation.navigate('RSSManagement');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>RSS Feed Management</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-4">
          <Text className="text-muted-foreground">
            Manage your RSS feeds, add custom feeds, and browse predefined options.
          </Text>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm text-muted-foreground">
              {feeds.length} feed{feeds.length !== 1 ? 's' : ''} configured
            </Text>
            <Button
              onPress={handleNavigateToRSSManagement}
              variant="outline"
              className="flex-row items-center gap-2">
              <Text>Manage Feeds</Text>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
