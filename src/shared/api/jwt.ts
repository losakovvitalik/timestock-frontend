export const isTokenValid = (token: string) => {
  if (!token) return false;

  try {
    // Декодируем JWT токен (payload находится между двумя точками)
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Проверяем срок действия (exp в секундах)
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    // Добавляем буфер в 1 минуту перед истечением
    return expirationTime - currentTime > 60000;
  } catch {
    return false;
  }
};
