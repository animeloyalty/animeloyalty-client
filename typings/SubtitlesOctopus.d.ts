declare class SubtitlesOctopus {
  constructor(options: {subUrl: string, video?: HTMLVideoElement, workerUrl: string});
  dispose(): void;
}
