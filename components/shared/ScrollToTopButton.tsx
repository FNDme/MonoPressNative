import { TouchableOpacity, Animated } from 'react-native';
import { ChevronUp } from '~/lib/icons/ChevronUp';

interface ScrollToTopButtonProps {
  showGoToTop: boolean;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  onPress: () => void;
}

export const ScrollToTopButton = ({
  showGoToTop,
  fadeAnim,
  scaleAnim,
  onPress,
}: ScrollToTopButtonProps) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
      pointerEvents={showGoToTop ? 'auto' : 'none'}>
      <TouchableOpacity
        onPress={onPress}
        className="h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg"
        style={{
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        activeOpacity={0.8}>
        <ChevronUp size={24} className="text-primary-foreground" />
      </TouchableOpacity>
    </Animated.View>
  );
};
