import { get, post, del, patch } from 'utils/http';

import entries from 'data/entries.json';

import { Type, IComment } from 'types';

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

export async function create(entry: any) {
  return post(`/entries`, entry);
}

export async function createComment(entryId: string, comment: any) {
  return post(
    `/entries/${entryId}/comments`,
    comment
  ) as unknown as Promise<IComment>;
  // @todo Fix type definition
}

export async function editComment(
  entryId: string,
  commentId: string,
  comment: any
) {
  return patch(`/entries/${entryId}/comments/${commentId}`, comment);
}

export async function deleteComment(entryId: string, commentId: string) {
  return del(
    `/entries/${entryId}/comments/${commentId}`
  ) as unknown as Promise<IComment>;
}
