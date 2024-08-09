export const buildDefaultTextDescription = ({
  min,
  max,
}: {
  min?: number;
  max?: number;
}) => {
  if (min && max) return `Type between ${min} and ${max} characters`;
  if (min) return `Type minimum ${min} characters`;
  if (max) return `Type maximum ${max} characters`;
  return null;
};

export const buildDefaultNumberDescription = ({
  min,
  max,
}: {
  min?: number;
  max?: number;
}) => {
  if (min && max) return `Enter a number between ${min} and ${max}`;
  if (min) return `Enter a number greater than ${min}`;
  if (max) return `Enter a number less than ${max}`;
  return null;
};

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

export const buildDefaultCheckboxGroupDescription = ({
  min,
  max,
}: {
  min?: number;
  max?: number;
}) => {
  if (min && max) return `Select between ${min} and ${max} options`;
  if (min) return `Select minimum ${min} options`;
  if (max) return `Select maximum ${max} options`;
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
