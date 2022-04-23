/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocument } from '../../hooks/useGetDocument';
import { isEmpty } from 'lodash';

export default function Donation({ id }: { id: string }) {
  const getDocumentAPI = useGetDocument();

  useEffect(() => {
    getDocumentAPI.getDocument({ id: id });
  }, []);
  if (getDocumentAPI.error) return <div>Error!</div>;
  if (getDocumentAPI.loading) return <div>Loading!</div>;
  if (isEmpty(getDocumentAPI.data)) return <div>No record!</div>;

  const donation = getDocumentAPI.data;
  const { type, district, description, priority, category, status } =
    donation?.attributes!;
  return <div>donation type: {type}</div>;
}
