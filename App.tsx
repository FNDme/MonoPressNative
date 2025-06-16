import { StatusBar } from 'expo-status-bar';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from './components/ThemeProvider';
import { LogBox } from 'react-native';

import './global.css';
import { createStaticNavigation, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RssProvider } from './context/rss-context';
import { ReaderContent } from './pages/ReaderContent';
import { ConfigContent } from './pages/config/ConfigContent';
import { MainContent } from './pages/MainContent';

// Ignore specific warnings that might not be relevant
LogBox.ignoreLogs(['ViewPropTypes will be removed', 'ColorPropType will be removed']);

export type RootStackParamList = {
  Home: undefined;
  Config: undefined;
  Reader: { url: string };
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

export default function App() {
  const Stack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screenOptions: {
      headerShown: false,
    },
    screens: {
      Home: {
        screen: MainContent,
      },
      Config: {
        screen: ConfigContent,
      },
      Reader: {
        screen: ReaderContent,
        options: {
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationMatchesGesture: true,
          animationDuration: 300,
        },
      },
    },
  });
  const Navigation = createStaticNavigation(Stack);

  return (
    <ThemeProvider>
      <RssProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <StatusBar style="auto" />
          <Navigation />
        </SafeAreaProvider>
        <PortalHost />
      </RssProvider>
    </ThemeProvider>
  );
}
