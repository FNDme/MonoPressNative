import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useStore } from '~/store/store';
import type { Post } from '~/types/feed';
import { CalendarDays } from '~/lib/icons/CalendarDays';
import { EyeOff } from '~/lib/icons/EyeOff';
import { Globe } from '~/lib/icons/Globe';
import { User } from '~/lib/icons/User';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { decode } from 'html-entities';

export default function PostCard({ post, className }: { post: Post; className?: string }) {
  const { link, title, description, image, tags, date, author, source } = post;
  const { discardId, undiscardId, discardedIds } = useStore();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleToggleDiscard = () => {
    if (discardedIds.includes(link)) {
      undiscardId(link);
    } else {
      discardId(link);
    }
  };

  const handlePress = () => {
    navigation.navigate('Reader', { url: link });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <View className="relative">
            {!!image && (
              <Image source={{ uri: image }} className="h-[200px] w-full" resizeMode="cover" />
            )}
            <TouchableOpacity
              className="bg-background/90 absolute right-2 top-2 rounded-full p-2"
              onPress={handleToggleDiscard}>
              <EyeOff size={16} className="text-foreground" />
            </TouchableOpacity>
          </View>
        </CardHeader>

        <CardContent className="mt-4">
          <CardTitle className="mb-2">{decode(title)}</CardTitle>
          {tags.length > 0 && (
            <View className="mb-2 flex-row flex-wrap gap-2">
              {tags.slice(0, 3).map((tag: string) => (
                <View key={tag} className="rounded bg-muted px-2 py-1">
                  <Text className="text-xs text-muted-foreground">{tag}</Text>
                </View>
              ))}
            </View>
          )}

          <Text className="text-sm leading-5 text-muted-foreground">{decode(description)}</Text>
        </CardContent>

        <CardFooter>
          <View className="flex-row flex-wrap gap-3">
            {date && (
              <View className="flex-row items-center gap-1">
                <CalendarDays size={16} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground">
                  {new Date(date).toLocaleDateString()}
                </Text>
              </View>
            )}
            {author && (
              <View className="flex-row items-center gap-1">
                <User size={16} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                  {author}
                </Text>
              </View>
            )}
            {source && (
              <TouchableOpacity
                className="flex-row items-center gap-1"
                onPress={() => navigation.navigate('Reader', { url: source.sourceUrl })}>
                <Globe size={16} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                  {source.sourceName || source.title}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </CardFooter>
      </Card>
    </TouchableOpacity>
  );
}
