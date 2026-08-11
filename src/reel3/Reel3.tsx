import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { Background } from "../reel1/Background";
import { BeatShell } from "./BeatShell";
import { CTA2 } from "./CTA2";
import { DUMMY_HEAD_CLIPS } from "./dummyHeadClips";
import { HOOK_BEAT, SCRIPT_BEATS, CTA_BEAT, beatDurationInFrames } from "./beats";

export const Reel3: React.FC = () => {
  const hookDuration = beatDurationInFrames(HOOK_BEAT);
  const ctaDuration = beatDurationInFrames(CTA_BEAT);

  return (
    <AbsoluteFill>
      <Background />
      <Audio src={staticFile("reel3-music.mp3")} volume={0.22} />
      <Series>
        <Series.Sequence durationInFrames={hookDuration}>
          <BeatShell
            beat={HOOK_BEAT}
            duration={hookDuration}
            dummyHeadSrc={DUMMY_HEAD_CLIPS[0]}
          />
        </Series.Sequence>

        {SCRIPT_BEATS.map((beat, i) => {
          const duration = beatDurationInFrames(beat);
          const beatIndex = i + 1;
          return (
            <Series.Sequence key={i} durationInFrames={duration}>
              <BeatShell
                beat={beat}
                duration={duration}
                dummyHeadSrc={DUMMY_HEAD_CLIPS[beatIndex]}
              />
            </Series.Sequence>
          );
        })}

        <Series.Sequence durationInFrames={ctaDuration}>
          <CTA2 text={CTA_BEAT.text} duration={ctaDuration} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
