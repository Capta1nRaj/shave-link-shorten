//! Function to generate the week in numbers
export function getWeekNumber(): number {
    // Copy date so don't modify original
    const today = new Date();
    const copiedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    copiedDate.setDate(copiedDate.getDate() + 4 - (copiedDate.getDay() || 7));
    // Get first day of year
    const yearStart = new Date(copiedDate.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    return Math.ceil((((copiedDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    // Return week number
}

//! Function to generate the month in numbers
export function getMonthNumber(): number {
    const today = new Date();
    return today.getMonth() + 1; // Months are zero-indexed, so January is 0, February is 1, etc.
}

//! Function to generate the year in numbers
export function getYearNumber(): number {
    const today = new Date();
    return today.getFullYear();
}
