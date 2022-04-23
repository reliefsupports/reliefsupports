import { useState } from 'react';
import { isEmpty } from 'lodash';
import { DocumentResponse } from 'types/document';
const baseURL = process.env.REACT_APP_STRAPI_BASE_URL;

const useGetDocument = () => {
  const [prevId, setNewId] = useState<string | null>(null);
  const [data, setData] = useState<DocumentResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getDocument = async ({ id, query }: { id: string; query?: string }) => {
    setLoading(true);
    if (isEmpty(id)) return;
    if (!isEmpty(id) && id === prevId) return data; // cache the data.
    try {
      const url = `${baseURL}/documents/${id}?${query ?? ''}`;
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    } catch (err: any) {
      setError((err.message as string) || 'Unexpected Error!');
    } finally {
      setNewId(id);
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    getDocument,
  };
};

export { useGetDocument };
