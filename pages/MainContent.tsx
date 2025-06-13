import { View, FlatList } from 'react-native';
import { useRss } from '~/context/rss-context';
import PostCard from '../components/shared/PostCard';
import { useStore } from '~/store/store';

export const MainContent = () => {
  const { posts, loading, error, refreshFeeds } = useRss();
  const { discardedIds } = useStore();

  const filteredPosts = posts.filter((post) => !discardedIds.includes(post.link));

  return (
    <View className="flex-1 bg-background">
      <FlatList
        refreshing={loading}
        onRefresh={refreshFeeds}
        data={filteredPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        className="flex-1"
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};
