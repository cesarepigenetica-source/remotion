import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { Reel1 } from "./reel1/Reel1";
import { REEL1_DURATION, FPS, WIDTH, HEIGHT } from "./reel1/beats";
import { Reel2 } from "./reel2/Reel2";
import { REEL2_DURATION } from "./reel2/beats";
import { Reel3 } from "./reel3/Reel3";
import { REEL3_DURATION } from "./reel3/beats";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Reel1"
        component={Reel1}
        durationInFrames={REEL1_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Reel2"
        component={Reel2}
        durationInFrames={REEL2_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Reel3"
        component={Reel3}
        durationInFrames={REEL3_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
