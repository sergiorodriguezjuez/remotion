import { Composition } from "remotion";
import { FPS, HEIGHT, WIDTH } from "./lib/timeline";
import { totalDurationInFrames, VideoEssay } from "./VideoEssay";

export const MyComposition = () => {
  return (
    <Composition
      id="VideoEssay"
      component={VideoEssay}
      durationInFrames={totalDurationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
