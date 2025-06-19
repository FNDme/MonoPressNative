import { View, FlatList } from 'react-native';
import { useRss } from '~/context/rss-context';
import PostCard from '../components/shared/PostCard';
import { useStore } from '~/store/store';
import { EmptyState } from '../components/shared/EmptyState';
import { Header } from '~/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useScrollToTop } from '~/hooks/useScrollToTop';
import { ScrollToTopButton } from '~/components/shared/ScrollToTopButton';

export const MainContent = () => {
  const { posts, loading, refreshFeeds } = useRss();
  const { discardedIds, bookmarkedPosts } = useStore();

  const [showDiscarded, setShowDiscarded] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const { flatListRef, showGoToTop, fadeAnim, scaleAnim, handleScroll, scrollToTop } =
    useScrollToTop();

  const filteredPosts = showBookmarks
    ? bookmarkedPosts
    : showDiscarded
      ? posts.filter((post) => discardedIds.includes(post.link))
      : posts.filter((post) => !discardedIds.includes(post.link));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        onDiscardPress={() => setShowDiscarded((prev) => !prev)}
        onBookmarkPress={() => setShowBookmarks((prev) => !prev)}
        showDiscarded={showDiscarded}
        showBookmarks={showBookmarks}
      />
      <View className="flex-1 bg-background">
        <FlatList
          ref={flatListRef}
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <EmptyState
              page={showBookmarks ? 'bookmarks' : showDiscarded ? 'hidden' : 'home'}
              toggleBookmarks={() => setShowBookmarks((prev) => !prev)}
              toggleDiscarded={() => setShowDiscarded((prev) => !prev)}
            />
          }
          removeClippedSubviews={true}
        />

        <ScrollToTopButton
          showGoToTop={showGoToTop}
          fadeAnim={fadeAnim}
          scaleAnim={scaleAnim}
          onPress={scrollToTop}
        />
      </View>
    </SafeAreaView>
  );
};
