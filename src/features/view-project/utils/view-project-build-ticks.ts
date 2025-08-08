const BASE_15M = 15 * 60; // секунды

function roundUpTo15m(seconds: number) {
  return Math.max(BASE_15M, Math.ceil(seconds / BASE_15M) * BASE_15M);
}

export function viewProjectBuildTicks(maxSeconds: number, intervals = 5) {
  const safeMax = Number.isFinite(maxSeconds) ? Math.max(0, Math.ceil(maxSeconds)) : 0;
  if (safeMax === 0) {
    // дефолт, чтобы ось не была пустой
    return [0, BASE_15M, BASE_15M * 2, BASE_15M * 3, BASE_15M * 4, BASE_15M * 5];
  }

  const rawStep = Math.ceil(safeMax / intervals);
  const step = roundUpTo15m(rawStep);
  const lastTick = Math.ceil(safeMax / step) * step;

  const ticks: number[] = [];
  for (let v = 0; v <= lastTick; v += step) ticks.push(v);
  if (ticks[0] !== 0) ticks.unshift(0);
  return ticks;
}
