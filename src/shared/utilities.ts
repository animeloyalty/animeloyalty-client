export function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);
  return toString(hours, minutes, seconds);
}

export function unsafe<T>(value: T) {
  return value as any;
}

function toString(hours: number, minutes: number, seconds: number) {
  const hoursString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');
  const secondsString = String(seconds).padStart(2, '0');
  return hours ? `${hoursString}:${minutesString}:${secondsString}` : `${minutesString}:${secondsString}`;
}
