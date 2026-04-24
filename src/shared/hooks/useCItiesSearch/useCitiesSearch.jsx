import { useEffect, useRef, useState } from 'react';
import { API } from '@/shared/api/index.js';

export const useCitiesSearch = (query) => {
  const [items, setItems] = useState([]);
  const timeoutRef = useRef(null);
  const abortRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!query) {
      setItems([]);
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    clearTimeout(timeoutRef.current);

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    timeoutRef.current = setTimeout(() => {
      fetch(`${API.CITIES}?name=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error('Ошибка запроса');
          return res.json();
        })
        .then((data) => {
          if (requestIdRef.current === currentRequestId) {
            setItems(data);
          }
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            console.error(error);
            setItems([]);
          }
        });
    }, 300);

    return () => {
      clearTimeout(timeoutRef.current);
      controller.abort();
    };
  }, [query]);

  return { items };
};