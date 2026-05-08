import { Main } from "./compositions/Main";

export type SceneMarker = {
  label: string;
  from: number;
  durationInFrames?: number;
};

export type CompositionConfig = {
  id: string;
  component: typeof Main;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  scenes?: SceneMarker[];
};

// Single composition configuration
export const composition: CompositionConfig = {
  id: "Main",
  component: Main,
  durationInFrames: 390,
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    { label: "Scene 1", from: 0, durationInFrames: 84 },
    { label: "Scene 2", from: 72, durationInFrames: 84 },
    { label: "Scene 3", from: 144, durationInFrames: 84 },
    { label: "Scene 4", from: 216, durationInFrames: 84 },
    { label: "Scene 5", from: 288, durationInFrames: 102 },
  ],
};
