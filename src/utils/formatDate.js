// "2026-11-04T09:00:00Z" -> "4 Nov 2026"
export const formatDate = (isoDate) =>
  isoDate
    ? new Date(isoDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;
