/**
 * Date utility functions for supplier collaboration components
 */

/**
 * Calculates the ISO week number for a given date string
 * @param dateString - Date string in any valid format
 * @returns Week number (1-53)
 */
export const getWeekNumber = (dateString: string): number => {
  const date = new Date(dateString);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return weekNumber;
};

/**
 * Formats a date string to yyyy-Mon-dd format
 * @param dateString - Date string in any valid format
 * @returns Formatted date string (e.g., "2024-Jan-15")
 */
export const formatDateToYYYYMonDD = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Formats a date with week number display
 * @param dateString - Date string in any valid format
 * @returns Object with formatted date and week number
 */
export const formatDateWithWeek = (dateString: string): { formattedDate: string; weekNumber: number } => {
  const formattedDate = formatDateToYYYYMonDD(dateString);
  const weekNumber = getWeekNumber(dateString);
  return { formattedDate, weekNumber };
};
