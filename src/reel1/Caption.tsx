import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ORANGE, WHITE } from "./colors";

type Token = { word: string; emphasis: boolean };

const PUNCTUATION_ONLY = /^[¿?¡!.,…"“”]+$/;

const tokenize = (text: string): Token[] => {
  const segments = text.split("**");
  const tokens: Token[] = [];
  segments.forEach((seg, i) => {
    const emphasis = i % 2 === 1;
    seg
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => tokens.push({ word, emphasis }));
  });
  // Merge stray punctuation (split off by a "**" boundary with no space,
  // e.g. "...**INGRESOS**?") back onto the previous word.
  const merged: Token[] = [];
  tokens.forEach((token) => {
    const prev = merged[merged.length - 1];
    if (prev && PUNCTUATION_ONLY.test(token.word)) {
      prev.word += token.word;
    } else {
      merged.push({ ...token });
    }
  });
  return merged;
};

const fontSizeForWordCount = (count: number): number => {
  if (count <= 3) return 108;
  if (count <= 6) return 84;
  if (count <= 9) return 68;
  return 58;
};

const EXIT_FRAMES = 12;
const STAGGER = 2;
const WORD_ENTER = 14;

export const Caption: React.FC<{
  text: string;
  duration: number;
  fontSize?: number;
  showCursor?: boolean;
}> = ({ text, duration, fontSize, showCursor }) => {
  const frame = useCurrentFrame();
  const tokens = tokenize(text);
  const size = fontSize ?? fontSizeForWordCount(tokens.length);

  const exitStart = Math.max(0, duration - EXIT_FRAMES);
  const exitProgress = interpolate(frame, [exitStart, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const groupOpacity = 1 - exitProgress;
  const groupTranslateY = -exitProgress * 22;
  const groupScale = 1 + exitProgress * 0.1;

  const blinkOn = Math.floor(frame / 15) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top: "50%",
        transform: `translateY(calc(-50% + ${groupTranslateY}px)) scale(${groupScale})`,
        opacity: groupOpacity,
        textAlign: "center",
        fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: -1,
        lineHeight: 1.14,
        fontSize: size,
        color: WHITE,
      }}
    >
      {tokens.map((token, i) => {
        const wordStart = i * STAGGER;
        const wordProgress = interpolate(
          frame,
          [wordStart, wordStart + WORD_ENTER],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.7)),
          },
        );
        const wordOpacity = interpolate(
          frame,
          [wordStart, wordStart + WORD_ENTER * 0.7],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              color: token.emphasis ? ORANGE : WHITE,
              opacity: wordOpacity,
              transform: `translateY(${(1 - wordProgress) * 34}px)`,
            }}
          >
            {token.word}
          </span>
        );
      })}
      {showCursor ? (
        <span
          style={{
            display: "inline-block",
            width: "0.09em",
            height: "0.82em",
            marginLeft: 6,
            verticalAlign: "-0.08em",
            backgroundColor: ORANGE,
            opacity: blinkOn ? 1 : 0,
            boxShadow: `0 0 18px 2px ${ORANGE}`,
          }}
        />
      ) : null}
    </div>
  );
};
