declare class SubtitlesOctopus {
  constructor(options: {subUrl: string, fonts?: Array<string>, video?: HTMLVideoElement, workerUrl: string});
  dispose(): void;
}
