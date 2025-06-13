import { Button } from '~/components/ui/button';
import { useColorScheme } from 'nativewind';
import { Sun } from '~/lib/icons/Sun';
import { Moon } from '~/lib/icons/Moon';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}>
      {colorScheme === 'light' ? (
        <Sun className="text-foreground" size={20} />
      ) : (
        <Moon className="text-foreground" size={20} />
      )}
    </Button>
  );
}
