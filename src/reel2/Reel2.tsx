import { AbsoluteFill, Series } from "remotion";
import { Background } from "../reel1/Background";
import { Chrome } from "../reel1/Chrome";
import { BeatShell } from "./BeatShell";
import { CTA2 } from "./CTA2";
import { HOOK_BEAT, SCRIPT_BEATS, CTA_BEAT, beatDurationInFrames } from "./beats";

export const Reel2: React.FC = () => {
  const hookDuration = beatDurationInFrames(HOOK_BEAT);
  const ctaDuration = beatDurationInFrames(CTA_BEAT);

  return (
    <AbsoluteFill>
      <Background />
      <Series>
        <Series.Sequence durationInFrames={hookDuration}>
          <BeatShell beat={HOOK_BEAT} duration={hookDuration} />
        </Series.Sequence>

        {SCRIPT_BEATS.map((beat, i) => {
          const duration = beatDurationInFrames(beat);
          return (
            <Series.Sequence key={i} durationInFrames={duration}>
              <BeatShell beat={beat} duration={duration} />
            </Series.Sequence>
          );
        })}

        <Series.Sequence durationInFrames={ctaDuration}>
          <CTA2 text={CTA_BEAT.text} duration={ctaDuration} />
        </Series.Sequence>
      </Series>
      <Chrome />
    </AbsoluteFill>
  );
};
