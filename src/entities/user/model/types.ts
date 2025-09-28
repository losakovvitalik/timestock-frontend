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
}

export interface UserPayload extends Partial<Pick<UserDTO, 'timezone'>> {}
