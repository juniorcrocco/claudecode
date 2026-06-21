import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneData } from '../scenes';
import { DISPLAY, LABEL, SIDE_PADDING, theme } from '../theme';
import { blurIn, fadeOut, fadeUp, wordPop } from '../lib/animations';
import { Logo } from './Logo';

const Container: React.FC<{ out: number; children: React.ReactNode }> = ({ out, children }) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: `0 ${SIDE_PADDING}px`,
      transform: 'translateY(-6%)',
      opacity: out,
    }}
  >
    {children}
  </AbsoluteFill>
);

const titleBase = (italic?: boolean): React.CSSProperties => ({
  fontFamily: DISPLAY,
  color: theme.color.cream,
  fontWeight: 400,
  fontStyle: italic ? 'italic' : 'normal',
  lineHeight: 1.1,
});

export const Lettering: React.FC<{ data: SceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const out = fadeOut(frame, durationInFrames, data.exitLen ?? 10);

  const enterStyle = (delay = 0) => {
    if (data.enter === 'fadeUp') return fadeUp(frame, delay);
    if (data.enter === 'blurIn') return blurIn(frame, delay);
    return wordPop(frame, fps);
  };

  // 1) LOGO + tagline
  if (data.logo) {
    return (
      <Container out={out}>
        <Logo style={blurIn(frame)} />
        {data.title && (
          <div
            style={{
              ...titleBase(),
              fontSize: theme.size.sub,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: theme.color.rose,
              marginTop: 28,
              ...fadeUp(frame, 12),
            }}
          >
            {data.title}
          </div>
        )}
      </Container>
    );
  }

  // 2) KICKER + fio + título
  if (data.kicker) {
    return (
      <Container out={out}>
        <div
          style={{
            fontFamily: LABEL,
            fontWeight: 600,
            fontSize: theme.size.kicker,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: theme.color.rose,
            ...wordPop(frame, fps),
          }}
        >
          {data.kicker}
        </div>
        <div
          style={{
            width: 64,
            height: 1,
            background: theme.color.gold,
            margin: '24px 0',
            ...fadeUp(frame, 6),
          }}
        />
        {data.title && (
          <div style={{ ...titleBase(data.italic), fontSize: theme.size.titleSm, ...fadeUp(frame, 6) }}>
            {data.title}
          </div>
        )}
      </Container>
    );
  }

  // 3) WORDS (stagger vertical)
  if (data.words) {
    return (
      <Container out={out}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {data.words.map((w, i) => (
            <div
              key={w}
              style={{ ...titleBase(), fontSize: theme.size.titleMd, ...fadeUp(frame, i * 26) }}
            >
              {w}
            </div>
          ))}
        </div>
      </Container>
    );
  }

  // 4) LINES (stagger vertical)
  if (data.lines) {
    const size = data.emphasis === 'lg' ? theme.size.titleLg : theme.size.titleMd;
    return (
      <Container out={out}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.lines.map((l, i) => {
            const e = data.enter === 'blurIn' ? blurIn(frame, i * 12) : fadeUp(frame, i * 12);
            return (
              <div key={l} style={{ ...titleBase(), fontSize: size, lineHeight: 1.08, ...e }}>
                {l}
              </div>
            );
          })}
        </div>
      </Container>
    );
  }

  // 5) só título
  return (
    <Container out={out}>
      <div style={{ ...titleBase(data.italic), fontSize: theme.size.titleMd, ...enterStyle() }}>
        {data.title}
      </div>
    </Container>
  );
};
