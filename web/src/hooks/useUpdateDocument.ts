import { useState } from 'react';
import { isEmpty } from 'lodash';
import { Document } from 'types/document';
const baseURL = process.env.REACT_APP_STRAPI_BASE_URL;

const useUpdateDocument = () => {
  const [isUpdated, setIsUpdatedData] = useState<Boolean | null>(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getDocument = async ({
    id,
    documentData,
  }: {
    id: string;
    documentData: Document;
  }) => {
    setLoading(true);
    if (isEmpty(documentData)) return;
    try {
      const url = `${baseURL}/documents/${id}`;
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ data: documentData }),
      });

      if (response.status === 200) setIsUpdatedData(true);
    } catch (err: any) {
      setError((err.message as string) || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return {
    isUpdated,
    error,
    loading,
    getDocument,
  };
};

export { useUpdateDocument };
