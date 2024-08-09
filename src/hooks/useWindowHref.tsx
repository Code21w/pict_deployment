import { useEffect, useState } from 'react';
export function useWindowHref() {
  const [result, setResult] = useState('');

  useEffect(() => {
    setResult(window.location.href);
  }, []);
  return result;
}
