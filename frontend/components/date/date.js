import { parseISO, format } from 'date-fns';

export default function FormattedDate({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'dd LLLL, yyyy HH:mm')}</time>;
}
