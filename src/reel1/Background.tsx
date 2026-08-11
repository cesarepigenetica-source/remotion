import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BLACK, BLACK_DEEP, ORANGE } from "./colors";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // slow, finite, seamless-looking pulse for the ambient glow
  const pulse = interpolate(
    frame % 180,
    [0, 90, 180],
    [0.55, 1, 0.55],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK_DEEP }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${ORANGE}22 0%, ${BLACK} 62%)`,
          opacity: pulse,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,90,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,90,31,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
