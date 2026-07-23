export function splitDateTime(dateTime: string): { date: string; time: string } {
  const [datePart, timePart] = dateTime.split(" ");
  const [year, month, day] = datePart.split("-");

  return {
    date: `${day}/${month}/${year}`,
    time: timePart.slice(0, 5),
  };
}
