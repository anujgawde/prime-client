export function formatDate(datetime) {
  const date = new Date(datetime);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
