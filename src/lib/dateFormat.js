import { parseISO, format, isValid } from 'date-fns';

export function formatDateTime(dateString) {
  if (!dateString) return null;

  const date = parseISO(dateString);
  if (!isValid(date)) return null;

  const formatted = format(date, 'hh:mmaaa, dd MMMM, yyyy');

  // Capitalize only the am/pm part using regex
  return formatted.replace(/(am|pm)/, match => match.toUpperCase());
}
