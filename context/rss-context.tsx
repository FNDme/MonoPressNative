import { useStore } from '~/store/store';
import debounce from 'lodash.debounce';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DOMParser } from 'xmldom';

import type { FeedCache, Post } from '~/types/feed';
import parseFeed from '~/utils/feedParser';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface RssContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refreshFeeds: () => Promise<void>;
}

const RssContext = createContext<RssContextType | undefined>(undefined);

export function RssProvider({ children }: { children: React.ReactNode }) {
  const { feeds } = useStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedCache, setFeedCache] = useState<FeedCache>({});

  const fetchSingleFeed = useCallback(
    async (url: string): Promise<Post[]> => {
      const cachedData = feedCache[url];
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml') as unknown as XMLDocument;
        const posts = parseFeed(xmlDoc);

        setFeedCache((prev) => ({
          ...prev,
          [url]: { data: posts, timestamp: Date.now() },
        }));

        return posts;
      } catch (error) {
        console.error(`Error fetching feed from ${url}:`, error);
        return [];
      }
    },
    [feedCache]
  );

  const fetchFeeds = useCallback(async () => {
    if (!feeds.length) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(feeds.map((feed) => fetchSingleFeed(feed.url)));
      const uniquePosts = new Map<string, Post>();

      results.flat().forEach((post) => {
        if (!uniquePosts.has(post.link)) {
          uniquePosts.set(post.link, post);
        }
      });

      const allPosts = Array.from(uniquePosts.values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setPosts(allPosts);
    } catch (error) {
      setError('Failed to fetch feeds');
      console.error('Error fetching feeds:', error);
    } finally {
      setLoading(false);
    }
  }, [feeds, fetchSingleFeed]);

  // Create a stable debounced function
  const debouncedFetch = useMemo(() => debounce(fetchFeeds, 500), [fetchFeeds]);

  useEffect(() => {
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  const value = useMemo(
    () => ({
      posts,
      loading,
      error,
      refreshFeeds: fetchFeeds,
    }),
    [posts, loading, error, fetchFeeds]
  );

  return <RssContext.Provider value={value}>{children}</RssContext.Provider>;
}

export function useRss() {
  const context = useContext(RssContext);
  if (!context) {
    throw new Error('useRss must be used within a RssProvider');
  }
  return context;
}
