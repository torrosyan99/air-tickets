export function normalizeCity(str)  {
  if (!str) return '';

  return str
    .toLowerCase()
    .split('-')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join('-');
}