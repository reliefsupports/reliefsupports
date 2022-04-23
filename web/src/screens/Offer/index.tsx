/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocument } from '../../hooks/useGetDocument';
import { isEmpty } from 'lodash';

export default function Offer({ id }: { id: string }) {
  const getDocumentAPI = useGetDocument();

  useEffect(() => {
    getDocumentAPI.getDocument({ id: id });
  }, []);
  if (getDocumentAPI.error) return <div>Error!</div>;
  if (getDocumentAPI.loading) return <div>Loading!</div>;
  if (isEmpty(getDocumentAPI.data)) return <div>No record!</div>;

  const offer = getDocumentAPI.data;
  const { type, district, description, priority, category, status } =
    offer?.attributes!;
  return <div>offer type: {type}</div>;
}
