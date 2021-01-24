import * as app from '..';
import * as mui from '@material-ui/core';

export const SliderComponent = mui.withStyles(() => ({
  rail: {
    borderRadius: 0,
    height: app.sz(2),
    width: (props: StreamSliderProps) => (props.max ? 100 / props.max * props.buffered : 0) + '%'
  },
  track: {
    borderRadius: 0,
    height: app.sz(2)
  },
  thumb: {
    borderRadius: app.sz(10),
    marginTop: 0,
    height: app.sz(10),
    width: app.sz(10),
    transform: `translateY(calc(-50% + ${app.sz(1)}))`,
    '&:hover': {boxShadow: 'none'},
    '&.Mui-focusVisible': {boxShadow: 'none'},
    '&.MuiSlider-active': {boxShadow: 'none'},
    '&:after': {bottom: app.sz(-5), left: app.sz(-5), right: app.sz(-5), top: app.sz(-5)}
  }
}))(mui.Slider);

type StreamSliderProps = mui.SliderProps & {
  buffered: number;
};
