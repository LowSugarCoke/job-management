/**
 * @summary Formats a date string into a local time string with timezone information.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string with timezone information.
 */
export const formatDateWithTimeZone = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}
