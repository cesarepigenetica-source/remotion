import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { EmphasisText } from "./EmphasisText";
import { BRollBadgeView } from "./BRollBadge";
import {
  BROLL_BADGES,
  PUNCH_INS,
  SCALE,
  SFX_CUES,
  TEXT_CARDS,
  s2f,
} from "./timeline";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

// Punch-in: escala suave hasta el valor objetivo y regreso a 100%.
const usePunchInScale = (frame: number) => {
  let scale = 1;
  for (const p of PUNCH_INS) {
    const start = s2f(p.start * SCALE);
    const end = s2f(p.end * SCALE);
    if (frame < start - 10 || frame > end + 10) continue;

    const rampIn = clamp01(
      interpolate(frame, [start - 8, start + 6], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
    const rampOut = clamp01(
      interpolate(frame, [end - 6, end + 10], [0, 1], {
        easing: Easing.inOut(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
    const local = interpolate(rampIn - rampOut, [0, 1], [1, p.scale]);
    if (local > scale) scale = local;
  }
  return scale;
};

const SFX_SRC: Record<string, string> = {
  pop: staticFile("sfx/pop.mp3"),
  whoosh: staticFile("sfx/whoosh.mp3"),
  impact: staticFile("sfx/impact.mp3"),
};

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const punchScale = usePunchInScale(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${punchScale})`,
          transformOrigin: "50% 42%",
        }}
      >
        <Video
          src={staticFile("AD_Renal_1.webm")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Viñeta sutil para contraste de textos, sin cubrir el rostro */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%)",
        }}
      />

      {TEXT_CARDS.map((card, i) => {
        const start = s2f(card.start * SCALE);
        const end = s2f(card.end * SCALE);
        if (frame < start || frame > end) return null;
        return (
          <EmphasisText
            key={i}
            card={card}
            frame={frame}
            startFrame={start}
            endFrame={end}
          />
        );
      })}

      {BROLL_BADGES.map((badge, i) => {
        const start = s2f(badge.start * SCALE);
        const end = s2f(badge.end * SCALE);
        if (frame < start || frame > end) return null;
        return (
          <BRollBadgeView
            key={i}
            badge={badge}
            frame={frame}
            startFrame={start}
            endFrame={end}
          />
        );
      })}

      {SFX_CUES.map((cue, i) => (
        <Sequence key={i} from={s2f(cue.time * SCALE)} durationInFrames={30}>
          <Audio src={SFX_SRC[cue.type]} volume={0.7} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
