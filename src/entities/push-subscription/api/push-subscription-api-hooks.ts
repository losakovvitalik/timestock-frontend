import { createApiHooks } from '@/shared/lib/react-query/create-api-hooks';
import { PushSubscriptionDTO, PushSubscriptionPayload } from '../models/types';

export const pushSubscriptionApiHooks = createApiHooks<
  PushSubscriptionDTO,
  PushSubscriptionPayload
>('push-subscription', '/push-subscriptions');
