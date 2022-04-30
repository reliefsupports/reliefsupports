export type Document = {
  type: string;
  district: string;
  description: string;
  priority: string;
  category: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  verified?: Boolean;
  tags?: Tags[];
};

export type DocumentResponse = {
  attributes: Document;
  id: string;
};

export type Tags = {
  id: string;
  type: string;
};
