import moment from 'moment';

export function getCurrentISODate(): string {
  return moment().toISOString();
}
export function tomorrowDateFormatted(): string {
  return moment().add(1, 'days').format('YYYY-MM-DD');
}
export function yesterdayDateFormatted(): string {
  return moment().subtract(1, 'days').format('YYYY-MM-DD');
}
