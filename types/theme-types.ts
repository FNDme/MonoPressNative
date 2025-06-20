export interface ThemeStyleProps {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  'chart-1': string;
  'chart-2': string;
  'chart-3': string;
  'chart-4': string;
  'chart-5': string;
  sidebar: string;
  'sidebar-foreground': string;
  'sidebar-primary': string;
  'sidebar-primary-foreground': string;
  'sidebar-accent': string;
  'sidebar-accent-foreground': string;
  'sidebar-border': string;
  'sidebar-ring': string;
  'font-sans': string;
  'font-serif': string;
  'font-mono': string;
  radius: string;
  'shadow-color': string;
  'shadow-opacity': string;
  'shadow-blur': string;
  'shadow-spread': string;
  'shadow-offset-x': string;
  'shadow-offset-y': string;
  'letter-spacing': string;
  spacing: string;
}

export interface ThemeStyles {
  light: ThemeStyleProps;
  dark: ThemeStyleProps;
}

export interface ThemeEditorPreviewProps {
  styles: ThemeStyles;
  currentMode: 'light' | 'dark';
}

export interface ThemeEditorControlsProps {
  styles: ThemeStyles;
  currentMode: 'light' | 'dark';
  onChange: (styles: ThemeStyles) => void;
  themePromise: Promise<Theme | null>;
}

export type ThemePreset = {
  source?: 'SAVED' | 'BUILT_IN';
  createdAt?: string;
  label?: string;
  styles: {
    light: Partial<ThemeStyleProps>;
    dark: Partial<ThemeStyleProps>;
  };
};

export interface Theme {
  id: string;
  name: string;
  description?: string;
  styles: ThemeStyles;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  isPublic: boolean;
  isDefault?: boolean;
}
