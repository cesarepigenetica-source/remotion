import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ORANGE, WHITE, WHITE_DIM } from "../reel1/colors";
import { CTA_SUBTEXT } from "./beats";

const SPARK_ANGLES = [20, 65, 110, 160, 205, 250, 295, 340];

export const CTA2: React.FC<{ text: string; duration: number }> = ({
  text,
  duration,
}) => {
  const frame = useCurrentFrame();

  const flash = interpolate(frame, [0, 3, 10], [0.45, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = frame < 5 ? (frame % 2 === 0 ? 10 : -10) * (1 - frame / 5) : 0;

  const headlineIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const subtextIn = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pillIn = interpolate(frame, [26, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.4)),
  });
  const pillPulse = 1 + Math.sin(Math.max(0, frame - 42) * 0.18) * 0.035;

  const sparkOut = interpolate(frame, [26, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
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
        inset: 0,
        opacity: 1 - exitProgress,
        transform: `translateX(${shakeX}px)`,
      }}
    >
      <div
        style={{ position: "absolute", inset: 0, backgroundColor: ORANGE, opacity: flash }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: "44%",
          transform: "translateY(-50%)",
          textAlign: "center",
          fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          {SPARK_ANGLES.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const dist = 210 + (i % 3) * 40;
            const x = Math.cos(rad) * dist * sparkOut;
            const y = Math.sin(rad) * dist * sparkOut;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: i % 2 === 0 ? ORANGE : WHITE,
                  opacity: interpolate(sparkOut, [0, 0.2, 1], [0, 1, 0.15]),
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}

          <div
            style={{
              opacity: headlineIn,
              transform: `scale(${interpolate(headlineIn, [0, 1], [0.75, 1])})`,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: -1,
              fontSize: 108,
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
            transform: `scale(${interpolate(pillIn, [0, 1], [0.7, 1]) * pillPulse})`,
            boxShadow: `0 0 30px 2px ${ORANGE}44`,
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
    </div>
  );
};
