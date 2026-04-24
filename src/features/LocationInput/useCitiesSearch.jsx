import { useEffect, useRef, useState } from 'react';

import { API } from '@/shared/api';

export const useCitiesSearch = (query) => {
  const [items, setItems] = useState([]);

  const timeoutRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {

    clearTimeout(timeoutRef.current);

    const controller = new AbortController();

    timeoutRef.current = setTimeout(() => {
      abortRef.current?.abort();
      abortRef.current = controller;

      fetch(`${API.CITIES}?name=${query}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error('Ошибка запроса');
          return res.json();
        })
        .then(setItems)
        .catch((error) => {
          if (error.name !== 'AbortError') {
            console.error(error);
            setItems([]);
          }
        })
    }, 300);

    return () => {
      clearTimeout(timeoutRef.current);
      abortRef.current?.abort();
    };
  }, [query]);

  return { items };
};