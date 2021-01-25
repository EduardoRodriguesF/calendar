function daysInMonth(month: number, year: number): number {
  console.log('daysInMonth:', month, year);
  return new Date(year, month, 0).getDate();
}

export default daysInMonth;
