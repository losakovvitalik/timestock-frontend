import { $api } from '@/shared/api';
import { PushSubscriptionDTO } from '../models/types';

export const pushSubscriptionApi = {
  findMy: (endpoint: string) =>
    $api
      .get<{ data: PushSubscriptionDTO }>('/push-subscriptions/my', {
        params: { endpoint },
      })
      .then((r) => r.data.data),
};
