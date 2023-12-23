import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(value: T, delayInMs: number): T => {
  const [data, setData] = useState(() => value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setData(value);
    }, delayInMs);

    return () => clearTimeout(timerId);
  }, [value]);

  return data;
};

interface Dimension {
  height: number;
  width: number;
}

export const useWindowResizeHandler = (): Dimension => {
  const [dimensions, setDimensions] = useState<Dimension>({
    height: window.innerHeight,
    width: window.innerWidth
  });
  const debouncedDimensions = useDebounce(dimensions, 900);

  useEffect(() => {
    const resizeListener = (): void => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };

    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return debouncedDimensions;
};

interface CountdownTimer {
  timerStatus: 'PRISTINE' | 'RUNNING' | 'STOPPED';
  value: number;
  startTimer(): void;
  stopTimer(): void;
}
export const useCountdownTimer = (duration: number): CountdownTimer => {
  const [value, setValue] = useState(() => duration);
  const [status, setStatus] = useState<CountdownTimer['timerStatus']>('PRISTINE');

  const timer = useRef<NodeJS.Timer>();

  const start = useCallback(() => {
    if (!timer.current) {
      setStatus('RUNNING');
      timer.current = setInterval(() => {
        setValue((timerValue) => (timerValue === 0 ? 0 : timerValue - 1));
      }, 1000);
    }
  }, []);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
      setValue(duration);
      setStatus('STOPPED');
    }
  }, []);

  return {
    value,
    timerStatus: status,
    startTimer: start,
    stopTimer: stop
  };
};
