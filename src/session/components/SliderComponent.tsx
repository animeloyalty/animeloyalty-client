import * as mui from '@material-ui/core';

export const SliderComponent = mui.withStyles(() => ({
  rail: {
    borderRadius: 0,
    height: 'max(0.4vmin, 2px)',
    width: (props: StreamSliderProps) => (props.max ? 100 / props.max * props.buffered : 0) + '%'
  },
  track: {
    borderRadius: 0,
    height: 'max(0.4vmin, 2px)'
  },
  thumb: {
    borderRadius: 'max(1vmin, 5px)',
    marginTop: 0,
    height: 'max(1.8vmin, 9px)',
    width: 'max(1.8vmin, 9px)',
    transform: 'translateY(calc(-50% + max(0.2vmin, 1px)))',
    '&:hover': {boxShadow: '0 0 0 max(1.8vmin, 9px) rgba(240, 160, 0, 0.15)'}
  }
}))(mui.Slider);

type StreamSliderProps = mui.SliderProps & {
  buffered: number;
};
