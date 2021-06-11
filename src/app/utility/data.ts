export function getGeoLocation(fn: Function) {
  if (!fn) return;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => fn(position));
  }
}

export function onTimeChange(value) {
  let timeSplit: [number, number] = value.split(':');
  let hours: number;
  let minutes: number;
  let meridian: string;

  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  return hours + ':' + minutes + ' ' + meridian;
}
