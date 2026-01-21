export interface TelegramLinkStatus {
  isConnected: boolean;
  notificationsEnabled: boolean;
}

export interface TelegramBotLink {
  link: string;
  expiresIn: number;
}
