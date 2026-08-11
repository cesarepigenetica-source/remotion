import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { Reel1 } from "./reel1/Reel1";
import { REEL1_DURATION, FPS, WIDTH, HEIGHT } from "./reel1/beats";

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
    </>
  );
};
