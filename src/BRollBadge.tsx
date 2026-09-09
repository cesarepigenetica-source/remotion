import { Easing, interpolate } from "remotion";
import type { BRollBadge } from "./timeline";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const KidneyIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6c-8 0-13 7-13 16 0 10 5 20 11 20 4 0 3-7 7-7s3 7 7 7c6 0 11-10 11-20 0-9-5-16-13-16-2 0-3 2-5 2s-3-2-5-2Z"
      stroke="#3DDC84"
      strokeWidth="3"
      fill="rgba(61,220,132,0.08)"
    />
  </svg>
);

const DialysisIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="26" height="28" rx="3" stroke="#3DDC84" strokeWidth="3" fill="rgba(61,220,132,0.08)" />
    <circle cx="19" cy="20" r="4" stroke="#3DDC84" strokeWidth="2.5" />
    <path d="M10 30h18M34 18v14M34 18l6 6M34 18l-6 6" stroke="#3DDC84" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const BRollBadgeView: React.FC<{
  badge: BRollBadge;
  frame: number;
  startFrame: number;
  endFrame: number;
}> = ({ badge, frame, startFrame, endFrame }) => {
  const local = frame - startFrame;
  const total = endFrame - startFrame;

  const inP = clamp01(
    interpolate(local, [0, 7], [0, 1], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const outP = clamp01(
    interpolate(local, [total - 8, total], [0, 1], {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const opacity = inP * (1 - outP);
  const scale = interpolate(inP, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "9%",
        right: "6%",
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          borderRadius: 14,
          background: "rgba(10,14,12,0.62)",
          border: "1px solid rgba(61,220,132,0.45)",
          backdropFilter: "blur(2px)",
        }}
      >
        {badge.icon === "kidney" ? <KidneyIcon /> : <DialysisIcon />}
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 1,
            color: "#FFFFFF",
          }}
        >
          {badge.label}
        </span>
      </div>
    </div>
  );
};
