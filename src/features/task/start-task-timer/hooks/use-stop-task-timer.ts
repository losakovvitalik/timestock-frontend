import { useStopTimeEntry } from '@/entities/time-entry/hooks/use-stop-time-entry';

export function useStopTaskTimer() {
  const { mutate, isPending } = useStopTimeEntry();

  return {
    stop: mutate,
    isStopPending: isPending,
  };
}
