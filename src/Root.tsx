import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { FPS, VIDEO_DURATION_S } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={MyComposition}
        durationInFrames={Math.ceil(VIDEO_DURATION_S * FPS)}
        fps={FPS}
        width={576}
        height={1024}
      />
    </>
  );
};
