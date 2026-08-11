import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ORANGE, WHITE_FAINT } from "./colors";

/** Persistent overlay UI: progress bar + kicker label. Rendered above everything else. */
export const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: '"Courier New", monospace',
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 6,
          color: WHITE_FAINT,
        }}
      >
        REEL · 01
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 56,
          height: 4,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: ORANGE,
            boxShadow: `0 0 16px 1px ${ORANGE}`,
          }}
        />
      </div>
    </>
  );
};
