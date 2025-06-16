import { Linking, View, Text } from 'react-native';
import { ThemeSelector } from './ThemeSelector';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const ThemesCard = () => {
  return (
    <Card>
      <CardHeader className="flex">
        <View className="flex flex-row items-center justify-between">
          <CardTitle>Theme</CardTitle>
          <Text className="text-sm text-muted-foreground">
            Themes by{' '}
            <Text
              onPress={() => Linking.openURL('https://tweakcn.com')}
              className="text-sm text-primary underline">
              Tweakcn
            </Text>
          </Text>
        </View>
      </CardHeader>
      <CardContent>
        <ThemeSelector />
      </CardContent>
    </Card>
  );
};
