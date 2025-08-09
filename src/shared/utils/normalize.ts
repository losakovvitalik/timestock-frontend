const toISO = (v: unknown) => (v instanceof Date ? v.toISOString() : v);

export const normalize = (v: any): any => {
  if (Array.isArray(v)) return v.map(normalize).sort(); // стабилизируем массивы
  if (v && typeof v === 'object') {
    return Object.keys(v)
      .filter((k) => v[k] !== undefined && v[k] !== null && v[k] !== '')
      .sort()
      .reduce(
        (acc, k) => {
          acc[k] = normalize(toISO(v[k]));
          return acc;
        },
        {} as Record<string, unknown>,
      );
  }
  return v;
};
