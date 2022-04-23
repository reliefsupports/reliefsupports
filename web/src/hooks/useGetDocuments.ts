import { useState } from 'react';
import { DocumentResponse } from 'types/document';
const baseURL = process.env.REACT_APP_STRAPI_BASE_URL;

const useGetDocuments = () => {
  const [data, setData] = useState<DocumentResponse[] | null>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getDocuments = async ({ query }: { query?: string }) => {
    setLoading(true);
    if (data && data.length) return data; // cache the data.
    try {
      const url = `${baseURL}/documents?${query}`;
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    } catch (err: any) {
      console.log(err);
      setError((err.message as string) || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    getDocuments,
  };
};

export { useGetDocuments };
