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
    height: 'max(2vmin, 10px)',
    width: 'max(2vmin, 10px)',
    transform: 'translateY(calc(-50% + max(0.2vmin, 1px)))',
    '&:hover': {boxShadow: 'none'},
    '&.Mui-focusVisible': {boxShadow: 'none'},
    '&.MuiSlider-active': {boxShadow: 'none'},
    '&:after': {
      bottom: 'max(-1.2vmin, -6px)',
      left: 'max(-1.2vmin, -6px)',
      right: 'max(-1.2vmin, -6px)',
      top: 'max(-1.2vmin, -6px)'
    }
  }
}))(mui.Slider);

type StreamSliderProps = mui.SliderProps & {
  buffered: number;
};
