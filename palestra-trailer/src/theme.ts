/**
 * Paleta cinematografica "teal & orange" — o look de trailer de cinema.
 * Sombras frias (teal), luzes quentes (ambar), preto profundo.
 */
export const theme = {
  color: {
    ink: '#05080b', // preto profundo (fundo / barras)
    teal: '#0e3a44', // sombra fria
    tealDeep: '#06181d',
    amber: '#f5a623', // luz quente / destaque
    ember: '#ff6b2c', // laranja brasa (acentos)
    gold: '#ffce6e',
    paper: '#f4efe7', // texto claro (off-white quente)
    smoke: 'rgba(244,239,231,0.72)',
  },
  font: {
    // Carregadas via @remotion/google-fonts em src/fonts.ts
    display: '"Anton", system-ui, sans-serif', // titulos pesados
    body: '"Archivo", system-ui, sans-serif', // subtitulos / labels
  },
} as const;
