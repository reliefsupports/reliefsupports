export enum Type {
  Request = 'Request',
  Offer = 'Offer',
}

export enum Category {
  Medicine = 'Medicine',
  Other = 'Other',
}

export enum Status {
  Active = 'Active',
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

export interface IEntry {
  id: string;
  type: Type.Request | Type.Offer;
  category: Category.Medicine | Category.Other;
  summary: string;
  body: string;
  createdAt: string;
  lastUpdatedAt: string;
  author: Author;
  status: Status.Active | Status.Resolved | Status.Resolved;
  priority: Priority.High | Priority.Medium | Priority.Low;
  location: Location;
  isVerified: boolean;
  externalSource?: string;
}
