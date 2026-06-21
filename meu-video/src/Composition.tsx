import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// Suave easing de "saída" — começa rápido e desacelera no final.
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

// Fundo escuro com um brilho radial que pulsa lentamente.
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brilho que respira entre 0.55 e 0.8 de opacidade.
  const glow = interpolate(
    Math.sin((frame / fps) * 1.2),
    [-1, 1],
    [0.55, 0.8],
  );

  // Rotação lenta e contínua do gradiente cônico de acento.
  const spin = (frame / fps) * 8;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f1a" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, #1c2540 0%, #0b0f1a 60%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: glow,
          rotate: `${spin}deg`,
          background:
            "conic-gradient(from 0deg at 50% 45%, rgba(99,102,241,0.0), rgba(99,102,241,0.25), rgba(56,189,248,0.0), rgba(99,102,241,0.0))",
          filter: "blur(60px)",
        }}
      />
    </AbsoluteFill>
  );
};

// Título principal: sobe e aparece com leve aumento de escala.
const Headline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const enter = interpolate(frame, [0, 0.9 * fps], [40, 0], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const scale = interpolate(frame, [0, 0.9 * fps], [0.92, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <div
      style={{
        opacity,
        translate: `0px ${enter}px`,
        scale,
        fontSize: 128,
        fontWeight: 800,
        letterSpacing: -2,
        color: "#ffffff",
        textAlign: "center",
        lineHeight: 1.05,
      }}
    >
      Olá, Remotion!
    </div>
  );
};

// Linha de acento que cresce horizontalmente sob o título.
const AccentLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = interpolate(frame, [0, 0.8 * fps], [0, 240], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <div
      style={{
        width,
        height: 6,
        borderRadius: 999,
        background: "linear-gradient(90deg, #6366f1, #38bdf8)",
      }}
    />
  );
};

// Subtítulo que aparece depois do título.
const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const enter = interpolate(frame, [0, 0.9 * fps], [24, 0], {
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <div
      style={{
        opacity,
        translate: `0px ${enter}px`,
        fontSize: 52,
        fontWeight: 500,
        color: "#9aa6c4",
        textAlign: "center",
      }}
    >
      Seu primeiro vídeo em React
    </div>
  );
};

export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
      <Sequence>
        <Background />
      </Sequence>

      {/* Coluna centralizada: cada elemento tem seu próprio espaço (gap). */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 36,
          padding: 100,
        }}
      >
        <Sequence layout="none">
          <Headline />
        </Sequence>

        <Sequence from={0.5 * fps} layout="none">
          <AccentLine />
        </Sequence>

        <Sequence from={0.8 * fps} layout="none">
          <Subtitle />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
