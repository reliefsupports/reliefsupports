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

export default function Donations() {
  const getDocumentsAPI = useGetDocuments();

  useEffect(() => {
    getDocumentsAPI.getDocuments({ query: query });
  }, []);
  if (getDocumentsAPI.error) return <div>Error!</div>;
  if (getDocumentsAPI.loading) return <div>Loading!</div>;
  if (isEmpty(getDocumentsAPI.data)) return <div>no donations!</div>;

  const donations = getDocumentsAPI.data;

  return (
    <div>
      {donations!.map((donation) => {
        const { type, district, description, priority, category, status } =
          donation.attributes;
        return <div key={donation.id}> donation type: {type}</div>;
      })}
    </div>
  );
}
