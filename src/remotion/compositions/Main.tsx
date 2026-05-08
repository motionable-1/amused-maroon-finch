import type { CSSProperties } from "react";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { AbsoluteFill, Artifact, Sequence, useCurrentFrame } from "remotion";
import "./Main.css";
import {
  FinalScene,
  OpeningScene,
  ProductScene,
  ReasoningScene,
  SafetyScene,
} from "./anthropic/Scenes";

const firstSceneDuration = 84;
const sceneStep = 72;
const finalSceneDuration = 102;

export const Main = () => {
  const frame = useCurrentFrame();
  const { fontFamily } = loadFont("normal", {
    weights: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
  });

  return (
    <>
      {frame === 0 && <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />}
      <AbsoluteFill
        className="anthropic-main"
        style={{ "--font-main": fontFamily } as CSSProperties}
      >
        <Sequence from={0} durationInFrames={firstSceneDuration}>
          <OpeningScene duration={firstSceneDuration} />
        </Sequence>
        <Sequence from={sceneStep} durationInFrames={firstSceneDuration}>
          <ReasoningScene duration={firstSceneDuration} />
        </Sequence>
        <Sequence from={sceneStep * 2} durationInFrames={firstSceneDuration}>
          <ProductScene duration={firstSceneDuration} />
        </Sequence>
        <Sequence from={sceneStep * 3} durationInFrames={firstSceneDuration}>
          <SafetyScene duration={firstSceneDuration} />
        </Sequence>
        <Sequence from={sceneStep * 4} durationInFrames={finalSceneDuration}>
          <FinalScene duration={finalSceneDuration} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
