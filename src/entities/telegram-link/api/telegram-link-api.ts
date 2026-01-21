import { $api } from '@/shared/api/base';
import { TelegramBotLink, TelegramLinkStatus } from '../models/telegram-link.types';

const BASE_PATH = '/telegram-links';

export const telegramLinkApi = {
  getStatus: async (): Promise<TelegramLinkStatus> => {
    const response = await $api.get<TelegramLinkStatus>(`${BASE_PATH}/status`);
    return response.data;
  },

  getBotLink: async (): Promise<TelegramBotLink> => {
    const response = await $api.get<TelegramBotLink>(`${BASE_PATH}/generate-link`);
    return response.data;
  },

  unlink: async (): Promise<void> => {
    await $api.delete(`${BASE_PATH}/unlink`);
  },

  toggleNotifications: async (enabled: boolean): Promise<{ notificationsEnabled: boolean }> => {
    const response = await $api.patch<{ notificationsEnabled: boolean }>(
      `${BASE_PATH}/notifications`,
      { enabled },
    );
    return response.data;
  },
};
