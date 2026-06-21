export type Enter = 'fadeUp' | 'blurIn' | 'wordPop';
export type Block = 'abertura' | 'rajada' | 'respira' | 'fechamento';

export interface SceneData {
  id: string;
  from: number;
  durationInFrames: number;
  block: Block;
  bg?: string;          // arquivo em public/video (sem caminho)
  kicker?: string;      // label uppercase
  title?: string;       // linha principal
  italic?: boolean;     // título em itálico
  words?: string[];     // entram em stagger (vertical)
  lines?: string[];     // entram em stagger (vertical)
  logo?: boolean;       // renderiza wordmark
  enter: Enter;
  exitLen?: number;     // frames de fadeOut
  emphasis?: 'lg';      // usa titleLg
}

export const FPS = 30;
export const DURATION = 1440;

export const scenes: SceneData[] = [
  // ABERTURA
  { id: 'hook1', from: 0,   durationInFrames: 45, block: 'abertura', bg: 'bg-fachada.mp4', title: 'No Shopping Tamboré', enter: 'fadeUp' },
  { id: 'hook2', from: 45,  durationInFrames: 45, block: 'abertura', bg: 'bg-fachada.mp4', title: 'um lugar que não vende serviço.', enter: 'fadeUp' },
  { id: 'hook3', from: 90,  durationInFrames: 45, block: 'abertura', bg: 'bg-espelho.mp4', title: 'Vende como você sai daqui.', enter: 'fadeUp' },
  { id: 'logoIn', from: 135, durationInFrames: 45, block: 'abertura', bg: 'bg-espelho.mp4', logo: true, title: 'Alphaville', enter: 'blurIn' },

  // RAJADA (corte no beat)
  { id: 's-cabelo', from: 180, durationInFrames: 30, block: 'rajada', bg: 'bg-cabelo.mp4', kicker: 'CABELO', title: 'Um corte pensado pro seu rosto.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-cor',    from: 210, durationInFrames: 30, block: 'rajada', bg: 'bg-cor.mp4', kicker: 'COR', title: 'Cor intensa. Fio respeitado.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-loiro',  from: 240, durationInFrames: 30, block: 'rajada', bg: 'bg-loiro.mp4', kicker: 'LOIRO', title: 'Loiro de salão de verdade.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-trat',   from: 270, durationInFrames: 30, block: 'rajada', bg: 'bg-tratamento.mp4', kicker: 'TRATAMENTO', title: 'Vida de volta ao fio.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-escova', from: 300, durationInFrames: 30, block: 'rajada', bg: 'bg-escova.mp4', kicker: 'ESCOVA', title: 'Saída de salão todo dia.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-unhas',  from: 330, durationInFrames: 30, block: 'rajada', bg: 'bg-unhas.mp4', kicker: 'UNHAS', title: 'Mãos que falam por você.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-pes',    from: 360, durationInFrames: 30, block: 'rajada', bg: 'bg-pes.mp4', kicker: 'PÉS', title: 'Spa pros pés que te levam longe.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-sobr',   from: 390, durationInFrames: 30, block: 'rajada', bg: 'bg-sobrancelha.mp4', kicker: 'SOBRANCELHA', title: 'O detalhe que muda o olhar.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-pele',   from: 420, durationInFrames: 30, block: 'rajada', bg: 'bg-pele.mp4', kicker: 'PELE', title: 'Pele que respira de novo.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-make',   from: 450, durationInFrames: 30, block: 'rajada', bg: 'bg-make.mp4', kicker: 'MAKE', title: 'Make que dura a festa inteira.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-noiva',  from: 480, durationInFrames: 30, block: 'rajada', bg: 'bg-noiva.mp4', kicker: 'NOIVA', title: 'O grande dia tem ensaio.', italic: true, enter: 'wordPop', exitLen: 4 },
  { id: 's-eles',   from: 510, durationInFrames: 30, block: 'rajada', bg: 'bg-eles.mp4', kicker: 'ELES TAMBÉM', title: 'Barba na navalha, toalha quente.', italic: true, enter: 'wordPop', exitLen: 4 },

  // RESPIRA / RITUAIS
  { id: 'bridge',  from: 540, durationInFrames: 75, block: 'respira', bg: 'bg-headspa.mp4', title: 'E quando beleza não basta…', italic: true, enter: 'blurIn', exitLen: 18 },
  { id: 'headspa', from: 615, durationInFrames: 90, block: 'respira', bg: 'bg-headspa.mp4', kicker: 'HEAD SPA', title: '90 minutos só seus.', italic: true, enter: 'blurIn', exitLen: 18 },
  { id: 'rituais', from: 705, durationInFrames: 75, block: 'respira', bg: 'bg-rituais.mp4', kicker: 'RITUAIS', title: 'Óleos, aroma, silêncio.', italic: true, enter: 'blurIn', exitLen: 18 },
  { id: 'deus',    from: 780, durationInFrames: 90, block: 'respira', bg: 'bg-deus.mp4', kicker: 'TEMPO COM DEUS E COMIGO', title: 'Beleza com propósito.', italic: true, enter: 'blurIn', exitLen: 18 },
  { id: 'casal',   from: 870, durationInFrames: 75, block: 'respira', bg: 'bg-casal.mp4', kicker: 'PRA DOIS', title: 'Cuidar junto, no mesmo tempo.', italic: true, enter: 'blurIn', exitLen: 18 },

  // FECHAMENTO
  { id: 'close1',  from: 945,  durationInFrames: 60,  block: 'fechamento', bg: 'bg-fechamento.mp4', logo: true, title: 'Seu espaço de beleza.', enter: 'blurIn' },
  { id: 'words',   from: 1005, durationInFrames: 120, block: 'fechamento', bg: 'bg-fechamento.mp4', words: ['Cuidado', 'Acolhimento', 'Relaxamento'], enter: 'fadeUp' },
  { id: 'central', from: 1125, durationInFrames: 165, block: 'fechamento', bg: 'bg-fechamento.mp4', lines: ['Um espaço feito para você', 'cuidar de você', 'como você cuida de todos.'], enter: 'blurIn', emphasis: 'lg' },
  { id: 'sign',    from: 1290, durationInFrames: 75,  block: 'fechamento', bg: 'bg-fechamento.mp4', logo: true, title: 'Feito para você se reencontrar.', enter: 'blurIn' },
  { id: 'cta',     from: 1365, durationInFrames: 75,  block: 'fechamento', bg: 'bg-fechamento.mp4', lines: ['Shopping Tamboré — Alphaville', '@ladyco.beauty   ·   ladyco.com.br'], enter: 'fadeUp' },
];
