import { useEffect, useState } from 'react';
import { staticFile, delayRender, continueRender } from 'remotion';

/**
 * Carrega as fontes (Anton + Archivo) de arquivos LOCAIS em public/fonts/.
 * Nada de rede no render — funciona offline aqui e na sua maquina.
 * Segura o render (delayRender) ate as fontes estarem prontas.
 */
export const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('load-fonts'));

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = staticFile('fonts/fonts.css');
    const done = () => continueRender(handle);
    link.onload = () => {
      Promise.allSettled([
        document.fonts.load('400 80px Anton'),
        document.fonts.load('400 32px Archivo'),
        document.fonts.load('600 32px Archivo'),
        document.fonts.load('800 32px Archivo'),
      ])
        .then(() => document.fonts.ready)
        .then(done)
        .catch(done);
    };
    link.onerror = done;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [handle]);

  return null;
};
