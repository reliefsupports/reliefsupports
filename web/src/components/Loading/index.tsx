import React from 'react';

export default function Loading({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return <div>Loading</div>;
}
