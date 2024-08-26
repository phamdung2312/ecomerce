import { useEffect, useState } from "react";

export const UseDebounce = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState();
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, delay);
    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);
  return valueDebounce;
};
