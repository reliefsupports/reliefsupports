import React from 'react';

export default function NoData({ isNoData }: { isNoData: boolean }) {
  if (!isNoData) return null;
  return <div>No Data!</div>;
}
