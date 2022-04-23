/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocuments } from '../../hooks/useGetDocuments';
import qs from 'qs';
import { isEmpty } from 'lodash';

const query = qs.stringify(
  {
    filters: {
      type: {
        $eq: 'offer',
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export default function Offers() {
  const getDocumentsAPI = useGetDocuments();

  useEffect(() => {
    getDocumentsAPI.getDocuments({ query: query });
  }, []);
  if (getDocumentsAPI.error) return <div>Error!</div>;
  if (getDocumentsAPI.loading) return <div>Loading!</div>;
  if (isEmpty(getDocumentsAPI.data)) return <div>no donations!</div>;

  const offers = getDocumentsAPI.data;

  return (
    <div>
      {offers!.map((offer) => {
        const { type, district, description, priority, category, status } =
          offer.attributes;
        return <div key={offer.id}> offer type: {type}</div>;
      })}
    </div>
  );
}
