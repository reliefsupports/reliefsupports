import { IComment, IEntry } from '../types';

export const getReqType = (locations: IEntry): any =>
  locations ? locations.type : null;

export const getReqPriority = (locations: IEntry): any =>
  locations ? locations.priority : null;

export const getAuthorName = (locations: IEntry | IComment): any =>
  locations && locations.author.name ? locations.author.name : null;

export const getCategory = (locations: IEntry): any =>
  locations && locations.category ? locations.category : null;

export const getDistrict = (locations: IEntry): any =>
  locations && locations.location && locations.location.city
    ? locations.location.city
    : null;

export const getStatus = (locations: IEntry): any =>
  locations && locations.status && locations.status ? locations.status : null;

export const getSummary = (locations: IEntry): any =>
  locations && locations.summary ? locations.summary : null;

export const getOrganization = (locations: IEntry | IComment): any =>
  locations && locations.author && locations.author.orgnization
    ? locations.author.orgnization
    : null;

export const IsVerified = (locations: IEntry): any =>
  locations && locations.isVerified ? locations.isVerified : false;

export const buildCommentsTree = (comments: IComment[]): IComment[] => {
  const topLevel: IComment[] = [];

  // Assume: comments are sorted by date, replies always come after their parent
  const index: { [id: string]: IComment } = {};
  for (const comment of comments) {
    index[comment.id] = comment;
    comment.children = [];

    const { parent } = comment;
    if (parent) {
      // If it has a parent, it's a reply
      if (!index[parent]) {
        // Reply to a deleted comment
        index[parent] = {
          id: parent,
          body: '<i>deleted</i>',
          author: { name: '<i>deleted</i>', phone: '<i>deleted</i>' },
          createdAt: comment.createdAt,
          lastUpdatedAt: comment.lastUpdatedAt,
          children: [],
        };
      }
      index[parent].children.push(comment);
    } else {
      topLevel.push(comment);
    }
  }

  return topLevel;
};
