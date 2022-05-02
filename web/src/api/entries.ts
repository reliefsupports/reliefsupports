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
