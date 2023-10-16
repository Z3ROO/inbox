export default function timePassedSince(date: string|Date) {
  if (typeof date === 'string')
    date = new Date(date);

  const now = Date.now();
  const then = date.getTime();
  const diff = now - then;
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 31;
  const year = day * 365;

  if (diff / minute < 120)
    return {
      value: Math.floor(diff / minute),
      metric: 'minute'
    }
  else if (diff / hour < 48)
    return {
      value: Math.floor(diff / hour),
      metric: 'hour'
    }
  else if (diff / day < 14)
    return {
      value: Math.floor(diff / day),
      metric: 'day'
    }
  else if (diff / week < 9)
    return {
      value: Math.floor(diff / week),
      metric: 'week'
    }
  else if (diff / month < 24)
    return {
      value: Math.floor(diff / month),
      metric: 'month'
    }
  else
    return {
      value: Math.floor(diff / year),
      metric: 'year'
    }
}