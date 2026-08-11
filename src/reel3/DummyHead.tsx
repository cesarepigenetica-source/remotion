import { AbsoluteFill, OffthreadVideo, useCurrentFrame } from "remotion";
import { BLACK, ORANGE } from "../reel1/colors";

/**
 * Wraps a Dummy Head B-roll clip with the three signature effects:
 * halftone dot screen ("serigrafía de puntos"), a sweeping glow/shine
 * ("brillo"), and a pendulum swing ("péndulo oscilante").
 */
export const DummyHead: React.FC<{
  src: string;
  width?: number;
  startFrom?: number;
}> = ({ src, width = 620, startFrom = 0 }) => {
  const frame = useCurrentFrame();

  // Pendulum: swings from a fixed pivot at the top, settling in amplitude
  // over the first second so it doesn't snap in at full swing.
  const settle = Math.min(1, frame / 30);
  const swing = Math.sin(frame * 0.045) * 4.5 * settle;

  // Shine sweep: a soft diagonal highlight crossing the frame every ~2.3s.
  const sweepCycle = 70;
  const sweepProgress = (frame % sweepCycle) / sweepCycle;
  const sweepX = -40 + sweepProgress * 180;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        width,
        height: width * 1.5,
        marginLeft: -width / 2,
        transformOrigin: "50% -12%",
        transform: `rotate(${swing}deg)`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: `0 0 60px 6px ${ORANGE}33`,
        }}
      >
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.15) saturate(0.15) brightness(1.05)",
          }}
        />

        {/* halftone dot screen */}
        <AbsoluteFill
          style={{
            backgroundImage: `radial-gradient(${BLACK} 32%, transparent 34%)`,
            backgroundSize: "7px 7px",
            mixBlendMode: "multiply",
            opacity: 0.55,
          }}
        />
        <AbsoluteFill
          style={{
            backgroundImage: `radial-gradient(${ORANGE} 26%, transparent 30%)`,
            backgroundSize: "7px 7px",
            backgroundPosition: "3.5px 3.5px",
            mixBlendMode: "screen",
            opacity: 0.22,
          }}
        />

        {/* shine sweep */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(115deg, transparent ${sweepX - 18}%, ${ORANGE}55 ${sweepX}%, transparent ${sweepX + 18}%)`,
            mixBlendMode: "screen",
          }}
        />

        <AbsoluteFill
          style={{
            border: `3px solid ${ORANGE}88`,
            borderRadius: 18,
            boxShadow: `inset 0 0 40px 8px ${BLACK}aa`,
          }}
        />
      </div>
    </div>
  );
};
