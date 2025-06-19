import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '~/App';
import { ChevronLeft } from '~/lib/icons/ChevronLeft';
import { AddRSSCard } from './AddRSSCard';
import { RSSListCard } from './RSSListCard';
import { PredefinedFeedsCard } from './PredefinedFeedsCard';

export const RSSManagementPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 bg-background">
        <ScrollView className="flex flex-1 gap-4" contentContainerStyle={{ padding: 16, gap: 16 }}>
          <View className="flex flex-row items-center justify-between">
            <Button variant="ghost" size="icon" onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} className="text-foreground" />
            </Button>
          </View>
          <AddRSSCard />
          <PredefinedFeedsCard />
          <RSSListCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
