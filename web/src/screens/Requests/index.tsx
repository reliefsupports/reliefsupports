/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocuments } from '../../hooks/useGetDocuments';
import qs from 'qs';
import { isEmpty } from 'lodash';

const query = qs.stringify(
  {
    filters: {
      type: {
        $eq: 'request',
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export default function Requests() {
  const getDocumentsAPI = useGetDocuments();

  useEffect(() => {
    getDocumentsAPI.getDocuments({ query: query });
  }, []);
  if (getDocumentsAPI.error) return <div>Error!</div>;
  if (getDocumentsAPI.loading) return <div>Loading!</div>;
  if (isEmpty(getDocumentsAPI.data)) return <div>no donations!</div>;

  const requests = getDocumentsAPI.data;

  return (
    <div>
      {requests!.map((request) => {
        const { type, district, description, priority, category, status } =
          request.attributes;
        return <div key={request.id}> request type: {type}</div>;
      })}
    </div>
  );
}
