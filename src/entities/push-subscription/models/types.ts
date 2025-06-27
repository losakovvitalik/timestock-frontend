import { ApiEntityBase } from '@/shared/types/api';

export interface PushSubscriptionDTO extends ApiEntityBase {
  user: string | number;
  subscription: Record<any, any>;
}

export interface PushSubscriptionPayload
  extends Pick<PushSubscriptionDTO, 'user' | 'subscription'> {}
