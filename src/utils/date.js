export function formatDate(date) {
  return new Date(date).toLocaleDateString("ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
