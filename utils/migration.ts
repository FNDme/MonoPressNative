import AsyncStorage from '@react-native-async-storage/async-storage';

interface Feed {
  name: string;
  url: string;
}

interface OldStore {
  urls: string[];
  discardedIds: string[];
  bookmarkedPosts: any[];
  selectedThemePreset: string;
}

interface NewStore {
  feeds: Feed[];
  discardedIds: string[];
  bookmarkedPosts: any[];
  selectedThemePreset: string;
}

export async function migrateFeedsFromUrls(): Promise<void> {
  try {
    const storedData = await AsyncStorage.getItem('feed-store');
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    // Check if we need to migrate from old structure
    if (
      parsedData.urls &&
      Array.isArray(parsedData.urls) &&
      parsedData.urls.length > 0 &&
      (!parsedData.feeds || parsedData.feeds.length === 0)
    ) {
      console.log('Migrating feeds from old structure to new structure');

      const migratedFeeds = parsedData.urls.map((url: string) => ({ name: url, url }));

      const newData: NewStore = {
        feeds: migratedFeeds,
        discardedIds: parsedData.discardedIds || [],
        bookmarkedPosts: parsedData.bookmarkedPosts || [],
        selectedThemePreset: parsedData.selectedThemePreset || 'caffeine',
      };

      await AsyncStorage.setItem('feed-store', JSON.stringify(newData));
      console.log('Migration completed successfully');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  }
}
