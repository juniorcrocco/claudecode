import { loadFont as loadDisplay } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadLabel } from '@remotion/google-fonts/Montserrat';

export const { fontFamily: DISPLAY } = loadDisplay();
export const { fontFamily: LABEL } = loadLabel();

// Paleta provisória — espírito "cuidado e autocuidado, não luxo".
// Substitua pelos hex oficiais do brand kit se houver.
export const theme = {
  color: {
    cream: '#F7F3EE',
    ink: '#2B2320',
    coffee: '#5A4A40',
    rose: '#C99B8C',
    sage: '#8A9A82',
    gold: '#C7A875',
  },
  size: {
    kicker: 40,
    titleSm: 64,
    titleMd: 88,
    titleLg: 104,
    sub: 38,
  },
} as const;

export const SIDE_PADDING = 96; // safe area lateral
