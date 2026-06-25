/**
 * ============================================================
 *  EDITE AQUI  —  tudo que muda o trailer esta neste arquivo.
 * ============================================================
 *
 * Troque os textos abaixo pelo conteudo da SUA palestra.
 * Depois rode:  npm run render   (gera out/trailer.mp4)
 */
export const config = {
  // Formato. 16:9 telao = 1920x1080. (9:16 vertical = 1080x1920.)
  width: 1920,
  height: 1080,
  fps: 30,

  // Ritmo da montagem (batidas por minuto da trilha). Cortes caem no beat.
  bpm: 100,

  // --- TEXTOS DO TRAILER -------------------------------------------------
  // Frase curta de abertura (sussurro inicial, sobre o preto).
  hook: 'CHEGOU A HORA',

  // Titulo principal — a "marca" da palestra. Use 1 ou 2 linhas curtas.
  title: {
    line1: 'O FUTURO',
    line2: 'COMECA AGORA',
  },

  // Subtitulo / promessa logo abaixo do titulo.
  subtitle: 'Uma experiencia que vai mudar a forma como voce pensa',

  // Palavras de impacto que "batem" durante a montagem (deixe 3 a 6).
  kickers: ['IDEIAS', 'CORAGEM', 'ACAO', 'TRANSFORMACAO'],

  // Cartao final.
  speaker: 'SEU NOME AQUI',
  endline: 'AO VIVO  •  2026',
  cta: '@seu_instagram',

  // Audio: coloque uma trilha em public/audio/track.mp3 e marque true.
  hasAudio: false,
} as const;

export type AppConfig = typeof config;
