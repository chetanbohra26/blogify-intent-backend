import { BaseModel } from "@intentjs/core";

export class BlogModel extends BaseModel {
  static tableName = 'blogs';

  id?: string;
  userId?: string;
  title?: string;
  slug?: string;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}