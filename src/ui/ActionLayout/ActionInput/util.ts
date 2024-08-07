export const buildDefaultDateDescription = ({
  minDate,
  maxDate,
  includeTime,
}: {
  minDate: Date | null;
  maxDate: Date | null;
  includeTime?: boolean;
}) => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: includeTime ? 'numeric' : undefined,
    minute: includeTime ? 'numeric' : undefined,
  });

  if (minDate && maxDate)
    return `Pick a date between ${formatter.format(minDate)} and ${formatter.format(maxDate)}`;
  if (minDate) return `Pick a date after ${formatter.format(minDate)}`;
  if (maxDate) return `Pick a date before ${formatter.format(maxDate)}`;
  return null;
};

export const extractTimeValue = (date: Date) => {
  return (
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0')
  );
};

export const extractDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
