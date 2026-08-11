import { AbsoluteFill, Series } from "remotion";
import { Background } from "./Background";
import { Chrome } from "./Chrome";
import { Caption } from "./Caption";
import { CTA } from "./CTA";
import { HOOK_BEAT, SCRIPT_BEATS, CTA_BEAT, beatDurationInFrames } from "./beats";

export const Reel1: React.FC = () => {
  const hookDuration = beatDurationInFrames(HOOK_BEAT);
  const ctaDuration = beatDurationInFrames(CTA_BEAT);

  return (
    <AbsoluteFill>
      <Background />
      <Series>
        <Series.Sequence durationInFrames={hookDuration}>
          <Caption
            text={HOOK_BEAT.text}
            duration={hookDuration}
            fontSize={74}
            showCursor
          />
        </Series.Sequence>

        {SCRIPT_BEATS.map((beat, i) => {
          const duration = beatDurationInFrames(beat);
          return (
            <Series.Sequence key={i} durationInFrames={duration}>
              <Caption text={beat.text} duration={duration} />
            </Series.Sequence>
          );
        })}

        <Series.Sequence durationInFrames={ctaDuration}>
          <CTA text={CTA_BEAT.text} duration={ctaDuration} />
        </Series.Sequence>
      </Series>
      <Chrome />
    </AbsoluteFill>
  );
};
