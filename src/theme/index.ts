export const theme = {
  colors: {
    background: '#FFFFFF', surface: '#F5F5F5', border: '#E8E8E8',
    grey: '#9A9A9A', greyDark: '#4A4A4A', black: '#111111', white: '#FFFFFF',
    accent: '#E63946', accentSoft: 'rgba(230,57,70,0.12)',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 8, md: 16, lg: 24, pill: 999 },
} as const;

export const brand = {
  name: 'concat',
  wordmark: 'concat()',
  tagline: 'you + them',
  operator: '+',
} as const;