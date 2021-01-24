export function formatTime(seconds: number) {
  const date = new Date(0, 0, 0, 0, 0, seconds);
  const hoursString = String(date.getHours()).padStart(2, '0');
  const minutesString = String(date.getMinutes()).padStart(2, '0');
  const secondsString = String(date.getSeconds()).padStart(2, '0');
  return date.getHours() ? `${hoursString}:${minutesString}:${secondsString}` : `${minutesString}:${secondsString}`;
}

export function sz(px: number) {
  const vmin = px / 5;
  return `max(${vmin}vmin, ${px}px)`;
}

export function unsafe<T>(value: T) {
  return value as any;
}
