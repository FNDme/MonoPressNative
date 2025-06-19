import type { DefaultThemes } from '~/constants/theme-presets';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Post } from '~/types/feed';

interface Feed {
  name: string;
  url: string;
}

interface Store {
  feeds: Feed[];
  discardedIds: string[];
  bookmarkedPosts: Post[];
  addFeed: (feed: Feed) => void;
  removeFeed: (url: string) => void;
  setFeeds: (feeds: Feed[]) => void;
  updateFeedName: (url: string, name: string) => void;
  discardId: (id: string) => void;
  undiscardId: (id: string) => void;
  selectedThemePreset: DefaultThemes;
  setSelectedThemePreset: (preset: DefaultThemes) => void;
  addBookmark: (post: Post) => void;
  removeBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;
  // Legacy support - these will be removed in a future version
  urls: string[];
  addUrl: (url: string) => void;
  removeUrl: (url: string) => void;
  setUrls: (urls: string[]) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      feeds: [],
      discardedIds: [],
      bookmarkedPosts: [],
      addFeed: (feed) => set((state) => ({ feeds: [...state.feeds, feed] })),
      removeFeed: (url) => set((state) => ({ feeds: state.feeds.filter((f) => f.url !== url) })),
      setFeeds: (feeds) => set({ feeds }),
      updateFeedName: (url, name) =>
        set((state) => ({
          feeds: state.feeds.map((feed) => (feed.url === url ? { ...feed, name } : feed)),
        })),
      discardId: (id) =>
        set((state) => ({
          discardedIds: [...state.discardedIds, id],
        })),
      undiscardId: (undiscardedId) =>
        set((state) => ({
          discardedIds: state.discardedIds.filter((id) => id !== undiscardedId),
        })),
      selectedThemePreset: 'caffeine',
      setSelectedThemePreset: (preset) => set({ selectedThemePreset: preset }),
      addBookmark: (post) =>
        set((state) => ({
          bookmarkedPosts: [...state.bookmarkedPosts, post],
        })),
      removeBookmark: (postId) =>
        set((state) => ({
          bookmarkedPosts: state.bookmarkedPosts.filter((post) => post.id !== postId),
        })),
      isBookmarked: (postId) => get().bookmarkedPosts.some((post) => post.id === postId),
      // Legacy support - these will be removed in a future version
      get urls() {
        return get().feeds.map((feed) => feed.url);
      },
      addUrl: (url) => set((state) => ({ feeds: [...state.feeds, { name: url, url }] })),
      removeUrl: (url) => set((state) => ({ feeds: state.feeds.filter((f) => f.url !== url) })),
      setUrls: (urls) => set({ feeds: urls.map((url) => ({ name: url, url })) }),
    }),
    {
      name: 'feed-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        feeds: state.feeds,
        discardedIds: state.discardedIds,
        bookmarkedPosts: state.bookmarkedPosts,
        selectedThemePreset: state.selectedThemePreset,
      }),
    }
  )
);
