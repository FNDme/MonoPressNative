import type { DefaultThemes } from '~/themes/theme-presets';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Store {
  urls: string[];
  discardedIds: string[];
  showDiscarded: boolean;
  addUrl: (url: string) => void;
  removeUrl: (url: string) => void;
  setUrls: (urls: string[]) => void;
  discardId: (id: string) => void;
  undiscardId: (id: string) => void;
  setShowDiscarded: (showDiscarded: boolean) => void;
  toggleDiscarded: () => void;
  selectedThemePreset: DefaultThemes;
  setSelectedThemePreset: (preset: DefaultThemes) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      urls: [],
      discardedIds: [],
      showDiscarded: false,
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
    }),
    {
      name: 'feed-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
