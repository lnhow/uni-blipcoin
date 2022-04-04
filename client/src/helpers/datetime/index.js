export function getLocalTimeFromTimestamp(timestamp) {
  const datetime = new Date(timestamp);
  return datetime.toLocaleString('en-GB');
}
