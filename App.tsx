import { ScreenContent } from '~/pages/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from './components/ThemeProvider';

import './global.css';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RssProvider } from './context/rss-context';
import { ReaderContent } from './pages/ReaderContent';
import { useColorScheme } from './lib/useColorScheme';

const HomeScreen = () => {
  return <ScreenContent title="Home" path="App.tsx" />;
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const { colorScheme } = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeProvider>
        <RssProvider>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
              <Stack.Screen
                options={{
                  headerShown: false,
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                  animationMatchesGesture: true,
                  animationDuration: 300,
                }}
                name="Reader"
                component={ReaderContent}
              />
            </Stack.Navigator>
          </SafeAreaProvider>
          <PortalHost />
        </RssProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
