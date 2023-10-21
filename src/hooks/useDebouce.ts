import { useRef } from "react";

interface IUseDebounceOptions {
  callback: Function;
  delay?: number;
  immediate?: boolean;
}

export const useDebounce = ({ callback, delay = 300, immediate = false }: IUseDebounceOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (immediate && !timeoutRef.current) {
      callback(...args);
    }

    timeoutRef.current = setTimeout(() => {
      if (!immediate) {
        callback(...args);
      }
      timeoutRef.current = null;
    }, delay);
  };

  return debouncedCallback;
};
