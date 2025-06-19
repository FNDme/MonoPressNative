import { View, Linking } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import { ExternalLink } from '~/lib/icons/ExternalLink';

export const AuthorCard = () => {
  const handleOpenGitHub = () => {
    Linking.openURL('https://github.com/FNDme');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-4">
          <Text className="text-muted-foreground">
            Monopress Native - A React Native RSS reader with a modern interface.
          </Text>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm text-muted-foreground">
              Developed by <Text className="text-sm font-medium text-primary">Gabriel</Text>
            </Text>
            <Button
              onPress={handleOpenGitHub}
              variant="outline"
              size="sm"
              className="flex-row items-center gap-2">
              <Text>GitHub</Text>
              <ExternalLink size={16} className="text-muted-foreground" />
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};
