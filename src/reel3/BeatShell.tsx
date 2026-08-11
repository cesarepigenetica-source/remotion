import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Caption } from "../reel1/Caption";
import { ORANGE } from "../reel1/colors";
import { Scene } from "./Scenes";
import { DummyHead } from "./DummyHead";
import { wordCount, type Beat } from "./beats";

const ENTER = 16;
const EXIT = 14;

const lowerThirdFontSize = (words: number): number => {
  if (words <= 3) return 76;
  if (words <= 6) return 60;
  if (words <= 9) return 48;
  return 40;
};

export const BeatShell: React.FC<{
  beat: Beat;
  duration: number;
  dummyHeadSrc?: string;
}> = ({ beat, duration, dummyHeadSrc }) => {
  const frame = useCurrentFrame();

  const enterProgress = interpolate(frame, [0, ENTER], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.poly(4)),
  });
  const exitProgress = interpolate(
    frame,
    [Math.max(0, duration - EXIT), duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );

  const scale =
    interpolate(enterProgress, [0, 1], [1.07, 1]) * (1 + exitProgress * 0.05);
  const opacity = enterProgress * (1 - exitProgress);
  const flash = interpolate(frame, [0, 2, 10], [0.16, 0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "60%" }}>
        {dummyHeadSrc ? (
          <DummyHead src={dummyHeadSrc} />
        ) : (
          <Scene scene={beat.scene} duration={duration} />
        )}
      </div>
      <Caption
        text={beat.text}
        duration={duration}
        topPercent={82}
        fontSize={lowerThirdFontSize(wordCount(beat.text))}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: ORANGE,
          opacity: flash,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
