export enum Type {
  Request = 'Request',
  Offer = 'Offer',
}

export enum Category {
  Medicine = 'Medicine',
  Other = 'Other',
}

export enum Status {
  Draft = 'Draft',
  Published = 'Published',
  Attended = 'Attended',
  Resolved = 'Resolved',
  Archived = 'Archived',
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export type Author = {
  name: string;
  phone: string;
  avatarUrl?: string;
  orgnization?: string;
};

export type Location = {
  city: string;
};

export interface IComment {
  id: string;
  author: Author;
  body: string;
  parent?: string;
  children: IComment[];
  createdAt: string;
  lastUpdatedAt: string;
}

export interface IEntry {
  id: string;
  type: Type.Request | Type.Offer;
  category: Category.Medicine | Category.Other;
  summary: string;
  body: string;
  comments: IComment[];
  createdAt: string;
  lastUpdatedAt: string;
  author: Author;
  status: Status.Draft | Status.Resolved | Status.Resolved;
  priority: Priority.High | Priority.Medium | Priority.Low;
  location: Location;
  isVerified: boolean;
  externalSource?: string;
}
