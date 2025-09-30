import { ApiCollectionResponse } from '@/shared/types/api';
import { InfiniteData } from '@tanstack/react-query';

export const extractInfiniteData = <T = any>(
  rawData: InfiniteData<ApiCollectionResponse<T>, unknown> | undefined,
) => {
  return rawData?.pages.flatMap((p) => p.data) ?? [];
};
