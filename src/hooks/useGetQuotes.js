import { useState } from 'react';
import { fetchQuotes } from '../api/fetchQuotes';

export const useGetQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuotes = () => {
    setIsLoading(true);
    fetchQuotes()
      .then(setQuotes)
      .then(() => setIsLoading(false));
  };

  return { isLoading, getQuotes, quotes };
};
