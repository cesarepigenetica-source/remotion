import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ORANGE, WHITE, WHITE_DIM } from "./colors";
import { CTA_SUBTEXT } from "./beats";

export const CTA: React.FC<{ text: string; duration: number }> = ({
  text,
  duration,
}) => {
  const frame = useCurrentFrame();

  const headlineIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.7)),
  });

  const subtextIn = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pillIn = interpolate(frame, [26, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  const exitStart = duration - 14;
  const exitProgress = interpolate(frame, [exitStart, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const parts = text.split("**");

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: "50%",
        transform: `translateY(-50%)`,
        opacity: 1 - exitProgress,
        textAlign: "center",
        fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          opacity: headlineIn,
          transform: `scale(${interpolate(headlineIn, [0, 1], [0.8, 1])})`,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: -1,
          fontSize: 104,
          lineHeight: 1.1,
          color: WHITE,
        }}
      >
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} style={{ color: ORANGE }}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </div>

      <div
        style={{
          marginTop: 40,
          opacity: subtextIn,
          transform: `translateY(${(1 - subtextIn) * 24}px)`,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1.4,
          color: WHITE_DIM,
          letterSpacing: 0,
        }}
      >
        {CTA_SUBTEXT}
      </div>

      <div
        style={{
          marginTop: 56,
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "18px 34px",
          borderRadius: 999,
          border: `2px solid ${ORANGE}`,
          opacity: pillIn,
          transform: `scale(${interpolate(pillIn, [0, 1], [0.7, 1])})`,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: ORANGE,
            boxShadow: `0 0 18px 3px ${ORANGE}`,
          }}
        />
        <span
          style={{
            fontFamily: '"Courier New", monospace',
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 3,
            color: WHITE,
            textTransform: "uppercase",
          }}
        >
          Deja tu comentario
        </span>
      </div>
    </div>
  );
};
