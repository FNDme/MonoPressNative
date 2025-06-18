import { useState, useRef, useCallback, useEffect } from 'react';
import { FlatList, Animated } from 'react-native';

interface UseScrollToTopReturn {
  flatListRef: React.RefObject<FlatList<any> | null>;
  showGoToTop: boolean;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  handleScroll: (event: any) => void;
  scrollToTop: () => void;
}

export const useScrollToTop = (): UseScrollToTopReturn => {
  const [showGoToTop, setShowGoToTop] = useState(false);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const handleScroll = useCallback(
    (event: any) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const shouldShow = offsetY > 200;

      if (shouldShow !== showGoToTop) {
        setShowGoToTop(shouldShow);
      }
    },
    [showGoToTop]
  );

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  // Animate button show/hide
  useEffect(() => {
    if (showGoToTop) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showGoToTop, fadeAnim, scaleAnim]);

  return {
    flatListRef,
    showGoToTop,
    fadeAnim,
    scaleAnim,
    handleScroll,
    scrollToTop,
  };
};
