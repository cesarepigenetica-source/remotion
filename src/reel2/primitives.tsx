import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ORANGE, WHITE } from "../reel1/colors";

/** A glowing circular node. `lit` in [0,1] drives intensity. */
export const Node: React.FC<{
  size: number;
  lit: number;
  wobble?: number;
  style?: React.CSSProperties;
}> = ({ size, lit, wobble = 0, style }) => {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `rotate(${wobble}deg)`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -size * 0.7,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}${Math.round(lit * 90)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `${Math.max(3, size * 0.05)}px solid ${
            lit > 0.5 ? ORANGE : "#2a2a2a"
          }`,
          backgroundColor: lit > 0.5 ? "#150900" : "#0a0a0a",
          boxShadow: lit > 0.5 ? `0 0 ${size * 0.5}px ${ORANGE}88` : "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: size * 0.32,
          borderRadius: "50%",
          backgroundColor: lit > 0.5 ? ORANGE : "#333333",
        }}
      />
    </div>
  );
};

/** A straight connector line between two points within a relative container. */
export const Connector: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  progress: number;
  dashed?: boolean;
  thickness?: number;
}> = ({ from, to, progress, dashed, thickness = 5 }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <div
      style={{
        position: "absolute",
        left: from.x,
        top: from.y,
        width: length,
        height: thickness,
        marginTop: -thickness / 2,
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg) scaleX(${progress})`,
        backgroundColor: dashed ? "transparent" : ORANGE,
        backgroundImage: dashed
          ? `repeating-linear-gradient(90deg, ${ORANGE} 0 14px, transparent 14px 26px)`
          : undefined,
        opacity: dashed ? 0.55 : 1,
        boxShadow: dashed ? "none" : `0 0 14px 1px ${ORANGE}aa`,
        borderRadius: 3,
      }}
    />
  );
};

// Fixed (deterministic) particle directions so "shatter" bursts are stable
// across preview and render.
const PARTICLE_ANGLES = [12, 46, 78, 103, 138, 172, 201, 233, 262, 289, 318, 344];

export const ShatterField: React.FC<{
  frame: number;
  triggerFrame: number;
  size: number;
}> = ({ frame, triggerFrame, size }) => {
  const local = frame - triggerFrame;
  if (local < 0) return null;

  return (
    <>
      {PARTICLE_ANGLES.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const distance = interpolate(local, [0, 26], [0, size * (1.4 + (i % 3) * 0.5)], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const opacity = interpolate(local, [0, 8, 26], [1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const x = Math.cos(rad) * distance;
        const y = Math.sin(rad) * distance;
        const shardSize = 10 + (i % 4) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: shardSize,
              height: shardSize,
              marginLeft: -shardSize / 2,
              marginTop: -shardSize / 2,
              backgroundColor: i % 2 === 0 ? ORANGE : WHITE,
              opacity,
              transform: `translate(${x}px, ${y}px) rotate(${angle * 3}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

/** Big kinetic headline word, punch-in with optional glitch double-vision. */
export const BigWord: React.FC<{
  text: string;
  frame: number;
  fontSize?: number;
  glitch?: boolean;
  color?: string;
}> = ({ text, frame, fontSize = 118, glitch, color = WHITE }) => {
  const enter = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.2)),
  });
  const shake = glitch && frame < 14 ? (frame % 2 === 0 ? 6 : -6) : 0;

  const base: React.CSSProperties = {
    fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: -2,
    fontSize,
    lineHeight: 1,
    color,
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        transform: `scale(${interpolate(enter, [0, 1], [0.55, 1])}) translateX(${shake}px)`,
        opacity: interpolate(frame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {glitch && frame < 16 ? (
        <span
          style={{
            ...base,
            position: "absolute",
            left: frame % 4 < 2 ? -8 : 8,
            top: 0,
            color: ORANGE,
            opacity: 0.7,
          }}
        >
          {text}
        </span>
      ) : null}
      <span style={base}>{text}</span>
    </div>
  );
};

export const useSceneClock = () => useCurrentFrame();
