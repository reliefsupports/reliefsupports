export enum Type {
  Request = 'Request',
  Offer = 'Offer',
}

export enum Category {
  Medicine = 'Medicine',
  Other = 'Other',
}

enum Status {
  Active = 'Active',
  Resolved = 'Resolved',
  Archived = 'Archived',
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export type User = {
  name: string;
  phone: string;
  avatarUrl?: string;
  orgnization?: string;
};

export interface IEntry {
  id: string;
  type: Type.Request | Type.Offer;
  category: Category.Medicine | Category.Other;
  summary: string;
  body: string;
  createdAt: string;
  lastUpdatedAt: string;
  postedBy: User;
  status: Status.Active | Status.Resolved | Status.Resolved;
  priority: Priority.High | Priority.Medium | Priority.Low;
  isVerified: boolean;
  externalSource?: string;
}

// {
//   "id": 1,
//   "category": "Medicine",
//   "summary": "Vitamin-C wanted at Nawala",
//   "body": "<p>Urgently need a few packs of Vitamin-C. My contact number 071111111.<p>",
//   "createdAt": "Mon May 02 2022 02:09:18 GMT+0530 (India Standard Time)",
//   "lastUpdatedAt": "Mon May 02 2022 02:09:18 GMT+0530 (India Standard Time)",
//   "postedBy": {
//     "name": "John Doe",
//     "phone": "+94711111111",
//     "avatarUrl": null,
//     "orgnization": null
//   },
//   "status": "Active",
//   "priority": "High",
//   "isVerified": false,
//   "externalSource": null
// },
