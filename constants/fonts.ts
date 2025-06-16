export const fonts = {
  sans: [
    'Inter',
    'Open Sans',
    'DM Sans',
    'Poppins',
    'Geist',
    'Architects Daughter',
    'Oxanium',
    'Montserrat',
    'Merriweather',
    'Quicksand',
    'Roboto',
    'Outfit',
    'Plus Jakarta Sans',
  ],
  serif: [
    'Source Serif 4',
    'Georgia',
    'Lora',
    'Times New Roman',
    'Playfair Display',
    'Libre Baskerville',
    'Merriweather',
  ],
  mono: [
    'JetBrains Mono',
    'Menlo',
    'Fira Code',
    'Courier New',
    'Source Code Pro',
    'Space Mono',
    'IBM Plex Mono',
    'Roboto Mono',
  ],
} as const;

export type FontFamily = {
  sans: (typeof fonts.sans)[number];
  serif: (typeof fonts.serif)[number];
  mono: (typeof fonts.mono)[number];
};
