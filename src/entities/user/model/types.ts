export interface UserDTO {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  timezone: string;
  first_timer_completed_at: string | null;
}

export interface UserPayload extends Partial<
  Pick<UserDTO, 'timezone' | 'first_timer_completed_at'>
> {}
