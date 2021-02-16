declare class SubtitlesOctopus {
  constructor(options: SubtitlesOctopusOptions);
  dispose(): void;
  getStyles(): void;
  setStyle(style: SubtitlesOctopusStyle, index: number): void;
}

type SubtitlesOctopusOptions = {
  debug?: boolean;
  lossyRender?: boolean;
  subUrl: string;
  workerUrl: string;
  fonts?: Array<string>;
  onWorkerMessage?: (event: SubtitlesOctopusEvent) => boolean;
  video?: HTMLVideoElement;
};

type SubtitlesOctopusEvent = {
  data: {target: 'canvas', op: string} | {target: 'get-styles', styles: Array<SubtitlesOctopusStyle>};
};

type SubtitlesOctopusStyle = {
  FontSize: number;
  Name: string;
};
