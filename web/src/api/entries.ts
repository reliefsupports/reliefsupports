import entries from 'data/entries.json';

import { Type } from 'types';

export async function fetchRequests() {
  return entries.filter(({ type }: any) => type === Type.Request);
}

export async function fetchOffers() {
  return entries.filter(({ type }: any) => type === Type.Offer);
}
