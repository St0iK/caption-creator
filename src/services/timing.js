/**
 * Seconds is a float version of the time in seconds (e.g. 13.456)
 * @returns {string}
 * @param seconds
 */
export function formatSeconds(seconds) {
  if (isNaN(seconds)) return '00:00.000';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  const mill = Math.round((seconds - Math.floor(seconds)) * 1000);
  return `${formatTimeUnit(min, 2)}:${formatTimeUnit(sec, 2)}.${formatTimeUnit(mill, 3)}`;
}

function formatTimeUnit(unit, width) {
  if (!unit) return '0'.repeat(width);
  return unit.toString().padStart(width, '0');
}

export function parseVTTTime(formattedTime) {
  const [min10, min1, sep1, sec10, sec1, sep2, mill10, mill100, mill1000] = formattedTime.split(''); // eslint-disable-line no-unused-vars

  return (
    parseTimeUnit(min10) * 10 * 60 +
    parseTimeUnit(min1) * 60 +
    parseTimeUnit(sec10) * 10 +
    parseTimeUnit(sec1) +
    parseTimeUnit(mill10) / 10 +
    parseTimeUnit(mill100) / 100 +
    parseTimeUnit(mill1000) / 1000
  );
}

function parseTimeUnit(unit) {
  const parsed = parseInt(unit);
  return isNaN(parsed) ? 0 : parsed;
}