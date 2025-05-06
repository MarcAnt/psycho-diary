import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, time?: number) => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  // console.log("debounceValue", value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, time || 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, time]);

  return debounceValue;
};

export default useDebounce;
