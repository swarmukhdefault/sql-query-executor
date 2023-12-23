import { useEffect, useState } from 'react';

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
