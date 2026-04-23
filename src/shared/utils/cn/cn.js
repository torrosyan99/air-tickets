export function cn(cls, additional=[], mods={}) {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods).filter(([_, value]) => value)
      .map(([key]) => key),
  ].join(' ')
}