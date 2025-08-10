let token: string | null = null;

export const authToken = {
  get: () => token,
  set: (t: string | null) => (token = t),
};
