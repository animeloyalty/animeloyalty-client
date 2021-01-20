declare class SubtitlesOctopus {
  constructor(options: {
    video?: HTMLVideoElement,
    subUrl: string,
    workerUrl: string
  });
  dispose(): void;
}
