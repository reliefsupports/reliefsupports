import { get } from 'utils/http';

import entries from 'data/entries.json';

import { Type } from 'types';

export async function fetchRequests(offset = 0, limit = 2) {
  return entries
    .filter(({ type }: any) => type === Type.Request)
    .slice(offset, offset + limit);
}

export async function fetchOffers(offset = 0, limit = 2) {
  return entries
    .filter(({ type }: any) => type === Type.Offer)
    .slice(offset, offset + limit);
}

export async function fetch(query: any) {
  const searchParams = new URLSearchParams();
  Object.keys(query).forEach((key: string) => {
    searchParams.append(key, query[key]);
  });

  return get(`/entries?${searchParams.toString()}`);
}
