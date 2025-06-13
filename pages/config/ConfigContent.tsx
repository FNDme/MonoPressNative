import { ScrollView, View } from 'react-native';
import { ThemesCard } from './ThemesCard';
import { AddRSSCard } from './AddRSSCard';
import { RSSListCard } from './RSSListCard';

export const ConfigContent = () => {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex flex-1 gap-4" contentContainerStyle={{ padding: 16, gap: 16 }}>
        <ThemesCard />
        <AddRSSCard />
        <RSSListCard />
      </ScrollView>
    </View>
  );
};
