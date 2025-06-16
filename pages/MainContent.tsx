import { View, FlatList } from 'react-native';
import { useRss } from '~/context/rss-context';
import PostCard from '../components/shared/PostCard';
import { useStore } from '~/store/store';
import { EmptyState } from '../components/shared/EmptyState';
import { Header } from '~/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MainContent = () => {
  const { posts, loading, refreshFeeds } = useRss();
  const { discardedIds, showDiscarded, bookmarkedPosts, showBookmarks } = useStore();

  const filteredPosts = showBookmarks
    ? bookmarkedPosts
    : showDiscarded
      ? posts.filter((post) => discardedIds.includes(post.link))
      : posts.filter((post) => !discardedIds.includes(post.link));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header />
      <View className="flex-1 bg-background">
        <FlatList
          refreshing={loading}
          onRefresh={refreshFeeds}
          data={filteredPosts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => `${item.id}-${item.source.sourceUrl}`}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          className="flex-1"
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          ListEmptyComponent={
            <EmptyState page={showBookmarks ? 'bookmarks' : showDiscarded ? 'hidden' : 'home'} />
          }
          removeClippedSubviews={true}
        />
      </View>
    </SafeAreaView>
  );
};
