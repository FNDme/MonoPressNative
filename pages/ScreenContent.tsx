import { MainContent } from '~/pages/MainContent';
import { ConfigContent } from '~/pages/config/ConfigContent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '~/components/Header';
import { useState } from 'react';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const [currentScreen, setCurrentScreen] = useState<'Main' | 'Config'>('Main');

  const handleScreenChange = (screen: 'Main' | 'Config') => {
    setCurrentScreen(screen);
  };

  return (
    <SafeAreaView className="border-border bg-background flex-1">
      <Header isConfigScreen={currentScreen === 'Config'} onScreenChange={handleScreenChange} />
      {currentScreen === 'Main' ? <MainContent /> : <ConfigContent />}
    </SafeAreaView>
  );
};
