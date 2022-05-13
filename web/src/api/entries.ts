import { get } from 'utils/http';

import entries from 'data/entries.json';

import { Type } from 'types';

export async function fetchRequests() {
  return entries.filter(({ type }: any) => type === Type.Request);
}

export async function fetchOffers() {
  return entries.filter(({ type }: any) => type === Type.Offer);
}

export async function fetch(query: any) {
  const searchParams = new URLSearchParams();
  Object.keys(query).forEach((key: string) => {
    searchParams.append(key, query[key]);
  });

  return get(`/entries?${searchParams.toString()}`);
}
