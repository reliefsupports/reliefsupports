import { useState } from 'react';
import { isEmpty } from 'lodash';
import { Document } from 'types/document';
const baseURL = process.env.REACT_APP_STRAPI_BASE_URL;

const useCreateDocument = () => {
  const [isCreated, setIsCreatedData] = useState<Boolean | null>(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getDocument = async ({ documentData }: { documentData: Document }) => {
    setLoading(true);
    if (isEmpty(documentData)) return;
    try {
      const url = `${baseURL}/documents`;
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ data: documentData }),
      });

      if (response.status === 200) setIsCreatedData(true);
    } catch (err: any) {
      setError((err.message as string) || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return {
    isCreated,
    error,
    loading,
    getDocument,
  };
};

export { useCreateDocument };
