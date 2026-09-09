import { Easing, interpolate } from "remotion";
import type { TextCard } from "./timeline";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const EmphasisText: React.FC<{
  card: TextCard;
  frame: number;
  startFrame: number;
  endFrame: number;
}> = ({ card, frame, startFrame, endFrame }) => {
  const local = frame - startFrame;
  const total = endFrame - startFrame;

  // Pop-in rápido (0 -> 8 frames), hold, fade+scale out corto (últimos 6 frames)
  const inProgress = clamp01(
    interpolate(local, [0, 8], [0, 1], {
      easing: Easing.out(Easing.back(1.6)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const outProgress = clamp01(
    interpolate(local, [total - 6, total], [0, 1], {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const opacity = inProgress * (1 - outProgress);
  const scale = interpolate(inProgress, [0, 1], [0.85, 1]) * (1 - outProgress * 0.06);
  const translateY = interpolate(inProgress, [0, 1], [14, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: card.emphasis ? "16%" : "20%",
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "0 8%",
          textAlign: "center",
        }}
      >
        {card.lines.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 14px",
            }}
          >
            {line.map((word, j) => (
              <span
                key={j}
                style={{
                  fontFamily:
                    "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: card.emphasis ? 64 : 52,
                  lineHeight: 1.05,
                  letterSpacing: -0.5,
                  color: word.green ? "#3DDC84" : "#FFFFFF",
                  textShadow: "0 2px 18px rgba(0,0,0,0.55)",
                  WebkitTextStroke: word.green
                    ? "0px transparent"
                    : "0px transparent",
                }}
              >
                {word.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
