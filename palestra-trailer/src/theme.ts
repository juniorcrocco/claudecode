import { loadFont } from '@remotion/fonts';
import antonW from '@fontsource/anton/files/anton-latin-400-normal.woff2';
import oswald400 from '@fontsource/oswald/files/oswald-latin-400-normal.woff2';
import oswald600 from '@fontsource/oswald/files/oswald-latin-600-normal.woff2';
import inter400 from '@fontsource/inter/files/inter-latin-400-normal.woff2';
import inter600 from '@fontsource/inter/files/inter-latin-600-normal.woff2';

// Fontes carregadas LOCALMENTE (sem rede) — o render funciona offline.
loadFont({ family: 'Anton', url: antonW, weight: '400' });
loadFont({ family: 'Oswald', url: oswald400, weight: '400' });
loadFont({ family: 'Oswald', url: oswald600, weight: '600' });
loadFont({ family: 'Inter', url: inter400, weight: '400' });
loadFont({ family: 'Inter', url: inter600, weight: '600' });

export const DISPLAY = 'Anton'; // condensado pesado p/ impacto
export const LABEL = 'Oswald'; // kickers / lower-thirds
export const BODY = 'Inter'; // créditos / CTA

// Paleta cinematográfica "épico de palco": preto profundo, branco quente,
// dourado de holofote e um aço frio pra contraste. Edite à vontade.
export const theme = {
  color: {
    ink: '#08090B',
    night: '#0E1116',
    white: '#F6F3EC',
    gold: '#E5B45B',
    goldSoft: '#C7A875',
    steel: '#7E94A6',
    blood: '#B7402E',
  },
} as const;

export type Orientation = 'landscape' | 'portrait';

export const DIMENSIONS: Record<Orientation, { width: number; height: number }> = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
};

// Tamanhos de tipografia escalados pela largura do quadro (base = 1080px de largura).
export const sizes = (width: number) => {
  const k = width / 1080;
  return {
    hero: Math.round(150 * k),
    title: Math.round(96 * k),
    titleSm: Math.round(64 * k),
    kicker: Math.round(34 * k),
    caption: Math.round(30 * k),
    credit: Math.round(28 * k),
    pad: Math.round(90 * k),
  };
};
