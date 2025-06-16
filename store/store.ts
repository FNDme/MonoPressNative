import type { DefaultThemes } from '~/constants/theme-presets';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Post } from '~/types/feed';

interface Store {
  urls: string[];
  discardedIds: string[];
  showDiscarded: boolean;
  bookmarkedPosts: Post[];
  showBookmarks: boolean;
  addUrl: (url: string) => void;
  removeUrl: (url: string) => void;
  setUrls: (urls: string[]) => void;
  discardId: (id: string) => void;
  undiscardId: (id: string) => void;
  setShowDiscarded: (showDiscarded: boolean) => void;
  toggleDiscarded: () => void;
  selectedThemePreset: DefaultThemes;
  setSelectedThemePreset: (preset: DefaultThemes) => void;
  addBookmark: (post: Post) => void;
  removeBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;
  setShowBookmarks: (showBookmarks: boolean) => void;
  toggleBookmarks: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      urls: [],
      discardedIds: [],
      showDiscarded: false,
      bookmarkedPosts: [],
      showBookmarks: false,
      addUrl: (url) => set((state) => ({ urls: [...state.urls, url] })),
      removeUrl: (url) => set((state) => ({ urls: state.urls.filter((u) => u !== url) })),
      setUrls: (urls) => set({ urls }),
      discardId: (id) =>
        set((state) => ({
          discardedIds: [...state.discardedIds, id],
        })),
      undiscardId: (undiscardedId) =>
        set((state) => ({
          discardedIds: state.discardedIds.filter((id) => id !== undiscardedId),
        })),
      setShowDiscarded: (showDiscarded) => set({ showDiscarded }),
      toggleDiscarded: () =>
        set((state) => ({
          showDiscarded: !state.showDiscarded,
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
      setShowBookmarks: (showBookmarks) => set({ showBookmarks }),
      toggleBookmarks: () =>
        set((state) => ({
          showBookmarks: !state.showBookmarks,
        })),
    }),
    {
      name: 'feed-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
