export function calculateAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return `${years} ano${years > 1 ? "s" : ""}`;
  }

  if (months > 0) {
    return `${months} ${months > 1 ? "meses" : "mês"}`;
  }

  const days = Math.floor(
    (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
  );
  return `${days} dia${days !== 1 ? "s" : ""}`;
}
